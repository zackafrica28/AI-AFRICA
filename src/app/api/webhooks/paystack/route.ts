import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
    const body = await request.text();
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!).update(body).digest('hex');

    const signature = request.headers.get('x-paystack-signature');

    if (hash !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
        const data = event.data;
        const { productId } = data.metadata;
        const customerEmail = data.customer.email;
        const amountTotal = data.amount / 100;

        try {
            await prisma.$transaction(async (tx: any) => {
                const user = await tx.user.findUnique({ where: { email: customerEmail } });
                if (!user) throw new Error("User not found");

                await tx.order.create({
                    data: {
                        userId: user.id,
                        total: amountTotal,
                        status: "PAID",
                        items: {
                            create: {
                                productId: productId,
                                quantity: 1,
                                price: amountTotal,
                            }
                        }
                    }
                });

                await tx.product.update({
                    where: { id: productId },
                    data: { stock: { decrement: 1 } }
                });
            });
        } catch (error) {
            console.error("Paystack recording failed:", error);
            return NextResponse.json({ error: "Order fulfillment failed" }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
