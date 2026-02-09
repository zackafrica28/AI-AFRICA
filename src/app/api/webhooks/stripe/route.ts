import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
    const body = await request.text();
    const sig = headers().get("stripe-signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
    } catch (err: any) {
        console.error("Webhook Signature Validation Failed:", err.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as any;

            const productId = session.metadata.productId;
            const customerEmail = session.customer_details.email;
            const amountTotal = session.amount_total / 100;

            try {
                // Record Order in DB
                await prisma.$transaction(async (tx) => {
                    // Find User
                    const user = await tx.user.findUnique({
                        where: { email: customerEmail }
                    });

                    if (!user) throw new Error("User not found for order");

                    // Create Order
                    const order = await tx.order.create({
                        data: {
                            userId: user.id,
                            total: amountTotal,
                            status: "PAID",
                            items: {
                                create: {
                                    productId: productId,
                                    quantity: 1,
                                    price: amountTotal, // Simplified for single item
                                }
                            }
                        }
                    });

                    // Update Stock
                    await tx.product.update({
                        where: { id: productId },
                        data: {
                            stock: { decrement: 1 }
                        }
                    });

                    console.log(`Order ${order.id} recorded for ${customerEmail}`);
                });
            } catch (error) {
                console.error("Order recording failed:", error);
                return NextResponse.json({ error: "Order fulfillment failed" }, { status: 500 });
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
