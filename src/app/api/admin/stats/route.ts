import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        const businessCount = await prisma.business.count();
        const productCount = await prisma.product.count();
        const orderCount = await prisma.order.count();

        const revenueResult = await prisma.order.aggregate({
            _sum: {
                total: true,
            },
        });

        const totalRevenue = revenueResult._sum.total || 0;

        return NextResponse.json({
            userCount,
            businessCount,
            productCount,
            orderCount,
            totalRevenue,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
