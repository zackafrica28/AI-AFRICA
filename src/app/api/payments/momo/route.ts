import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

/**
 * POST /api/payments/momo
 * Initiates an MTN MoMo payment request for a given order.
 * Body: { orderId: string, phone: string }
 */
export async function POST(req: Request) {
    try {
        const { orderId, phone } = await req.json();

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const reference = crypto.randomUUID();

        // Mark order as payment pending
        await prisma.order.update({
            where: { id: orderId },
            data: { status: OrderStatus.PAYMENT_PENDING }
        });

        // Call MTN MoMo Collections API using native fetch
        const momoResponse = await fetch(process.env.MOMO_REQUEST_URL!, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.MOMO_TOKEN}`,
                "X-Reference-Id": reference,
                "X-Target-Environment": process.env.MOMO_TARGET_ENVIRONMENT || "sandbox",
                "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY!,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: order.total,
                currency: "GHS",
                externalId: reference,
                payer: {
                    partyIdType: "MSISDN",
                    partyId: phone
                },
                payerMessage: "AI-AFRICA Marketplace Payment",
                payeeNote: `Order ${orderId}`
            })
        });

        if (!momoResponse.ok) {
            const err = await momoResponse.text();
            console.error("MoMo API error:", err);
            return NextResponse.json({ error: "MoMo payment initiation failed" }, { status: 502 });
        }

        return NextResponse.json({ reference, status: "PAYMENT_PENDING" });
    } catch (error: any) {
        console.error("MoMo initiation error:", error.message);
        return NextResponse.json({ error: "Failed to initiate MoMo payment" }, { status: 500 });
    }
}
