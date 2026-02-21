import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        const orders = await prisma.order.findMany({
            where: userId ? { userId } : {},
            include: {
                product: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(orders);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId, productId, total, status } = await request.json();

        const order = await prisma.order.create({
            data: {
                userId,
                productId,
                total,
                status: (status as OrderStatus) || OrderStatus.PAID,
            },
        });

        return NextResponse.json(order);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
