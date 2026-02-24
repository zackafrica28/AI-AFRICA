import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        let wallet = await prisma.wallet.findUnique({
            where: { userId },
            include: {
                transactions: {
                    orderBy: { createdAt: "desc" },
                    take: 10
                }
            }
        });

        // Auto-create wallet if missing
        if (!wallet) {
            wallet = await prisma.wallet.create({
                data: {
                    userId,
                    balance: 0,
                    type: "USER"
                },
                include: {
                    transactions: true
                }
            });
        }

        return NextResponse.json(wallet);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
