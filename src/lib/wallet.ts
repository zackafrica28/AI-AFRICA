import { prisma } from "@/lib/prisma";

/**
 * Credits (adds) an amount to a wallet's balance.
 */
export async function creditWallet(walletId: string, amount: number) {
    return prisma.wallet.update({
        where: { id: walletId },
        data: {
            balance: { increment: amount }
        }
    });
}

/**
 * Debits (subtracts) an amount from a wallet's balance.
 * Throws if the wallet has insufficient funds.
 */
export async function debitWallet(walletId: string, amount: number) {
    const wallet = await prisma.wallet.findUnique({
        where: { id: walletId }
    });

    if (!wallet || wallet.balance < amount) {
        throw new Error("Insufficient wallet balance");
    }

    return prisma.wallet.update({
        where: { id: walletId },
        data: {
            balance: { decrement: amount }
        }
    });
}
