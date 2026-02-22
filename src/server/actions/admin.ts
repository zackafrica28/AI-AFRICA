"use server";

import { prisma } from "@/lib/prisma";

/**
 * Fetches global platform analytics for the Admin Control Panel.
 */
export async function getGlobalAnalytics() {
    const [userCount, businessCount, productCount, orderCount] = await Promise.all([
        prisma.user.count(),
        prisma.business.count(),
        prisma.product.count(),
        prisma.order.count(),
    ]);

    const totalRevenue = await prisma.order.aggregate({
        _sum: { total: true }
    });

    return {
        userCount,
        vendorCount,
        productCount,
        orderCount,
        totalRevenue: totalRevenue._sum.total || 0,
    };
}
