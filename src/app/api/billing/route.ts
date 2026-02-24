import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const subscriptions = await prisma.subscription.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        const payments = await prisma.payment.findMany({
            where: {
                order: {
                    userId: userId
                }
            },
            include: {
                order: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            take: 10
        });

        return NextResponse.json({
            subscriptions,
            payments
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
