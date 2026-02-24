import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const customers = await prisma.customer.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        const leads = await prisma.lead.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        const deals = await prisma.deal.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        const activities = await prisma.activity.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 20
        });

        return NextResponse.json({
            customers,
            leads,
            deals,
            activities
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
