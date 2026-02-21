import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const order = await prisma.order.create({
            data: {
                userId: body.userId,
                productId: body.productId,
                total: body.total || body.amount,
            },
        });

        return NextResponse.json(order);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
