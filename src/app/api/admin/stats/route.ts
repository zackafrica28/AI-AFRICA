import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        const vendorCount = await prisma.vendor.count();
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
            vendorCount,
            productCount,
            orderCount,
            totalRevenue,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
