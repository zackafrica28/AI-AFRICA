import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                seller: true,
            },
        });

        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const product = await prisma.product.create({
            data: {
                title: body.title,
                description: body.description,
                price: body.price,
                sellerId: body.sellerId,
                image: body.image,
            },
        });

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
