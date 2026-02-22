import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { debitWallet, creditWallet } from "@/lib/wallet";
import { OrderStatus, TransactionType, WalletType } from "@prisma/client";

const PLATFORM_COMMISSION_RATE = 0.10; // 10% commission to AI-AFRICA

/**
 * POST /api/escrow/release
 * Admin-triggered endpoint to release escrowed funds to the vendor.
 * Applies a 10% platform commission retained in the SYSTEM wallet.
 * Body: { orderId: string }
 */
export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (order.status !== OrderStatus.ESCROWED) {
            return NextResponse.json(
                { error: `Cannot release order with status: ${order.status}` },
                { status: 400 }
            );
        }

        if (!order.escrowWalletId || !order.vendorId) {
            return NextResponse.json(
                { error: "Order missing escrowWalletId or vendorId" },
                { status: 400 }
            );
        }

        // Find vendor's wallet
        const vendorWallet = await prisma.wallet.findFirst({
            where: { userId: order.vendorId }
        });

        if (!vendorWallet) {
            return NextResponse.json({ error: "Vendor wallet not found" }, { status: 404 });
        }

        // Find the SYSTEM wallet for commission
        const systemWallet = await prisma.wallet.findFirst({
            where: { type: WalletType.SYSTEM }
        });

        if (!systemWallet) {
            return NextResponse.json({ error: "System wallet not configured" }, { status: 500 });
        }

        const totalAmount = order.total;
        const commission = Math.round(totalAmount * PLATFORM_COMMISSION_RATE * 100) / 100;
        const vendorAmount = Math.round((totalAmount - commission) * 100) / 100;
        const releaseRef = crypto.randomUUID();

        // Atomic DB transaction: debit escrow, split to vendor + system
        await prisma.$transaction(async (tx) => {
            // 1. Debit escrow wallet
            await tx.wallet.update({
                where: { id: order.escrowWalletId! },
                data: { balance: { decrement: totalAmount } }
            });

            // 2. Credit vendor wallet
            await tx.wallet.update({
                where: { id: vendorWallet.id },
                data: { balance: { increment: vendorAmount } }
            });

            // 3. Credit system wallet (commission)
            await tx.wallet.update({
                where: { id: systemWallet.id },
                data: { balance: { increment: commission } }
            });

            // 4. Record escrow release transaction
            await tx.transaction.create({
                data: {
                    walletId: vendorWallet.id,
                    amount: vendorAmount,
                    type: TransactionType.ESCROW_RELEASE,
                    reference: releaseRef
                }
            });

            // 5. Record commission transaction
            await tx.transaction.create({
                data: {
                    walletId: systemWallet.id,
                    amount: commission,
                    type: TransactionType.PAYMENT,
                    reference: `commission-${releaseRef}`
                }
            });

            // 6. Mark order as COMPLETED
            await tx.order.update({
                where: { id: orderId },
                data: { status: OrderStatus.COMPLETED }
            });
        });

        return NextResponse.json({
            released: true,
            vendorAmount,
            commission,
            orderId
        });
    } catch (error: any) {
        console.error("Escrow release error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
