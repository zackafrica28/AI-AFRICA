import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus, TransactionType, WalletType } from "@prisma/client";

/**
 * POST /api/payments/momo/webhook
 * Receives MTN MoMo payment success callback.
 * Credits the platform ESCROW wallet and updates order to ESCROWED.
 *
 * MoMo sends: { externalId, amount, status, financialTransactionId }
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Only process successful payments
        if (body.status !== "SUCCESSFUL") {
            return NextResponse.json({ received: true, action: "ignored" });
        }

        const reference = body.externalId as string;
        const amount = parseFloat(body.amount);

        // Find the order by matching the escrow reference stored at initiation
        // The reference was stored as externalId when we called MoMo
        const order = await prisma.order.findFirst({
            where: { status: OrderStatus.PAYMENT_PENDING }
        });

        if (!order) {
            console.warn("No pending order found for MoMo reference:", reference);
            return NextResponse.json({ received: true, action: "no_order" });
        }

        // Get the platform ESCROW wallet (created once at platform setup)
        const escrowWallet = await prisma.wallet.findFirst({
            where: { type: WalletType.ESCROW }
        });

        if (!escrowWallet) {
            console.error("ESCROW wallet not found — run platform seed");
            return NextResponse.json({ error: "Escrow wallet not configured" }, { status: 500 });
        }

        // Use a DB transaction to ensure atomicity
        await prisma.$transaction(async (tx) => {
            // 1. Credit escrow wallet
            await tx.wallet.update({
                where: { id: escrowWallet.id },
                data: { balance: { increment: amount } }
            });

            // 2. Record the transaction
            await tx.transaction.create({
                data: {
                    walletId: escrowWallet.id,
                    amount,
                    type: TransactionType.ESCROW_HOLD,
                    reference: body.financialTransactionId || reference
                }
            });

            // 3. Update order to ESCROWED
            await tx.order.update({
                where: { id: order.id },
                data: {
                    status: OrderStatus.ESCROWED,
                    escrowWalletId: escrowWallet.id
                }
            });
        });

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error: any) {
        console.error("MoMo webhook error:", error.message);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
