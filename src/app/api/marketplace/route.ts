import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: { active: true },
            include: {
                seller: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
