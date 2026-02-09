"use server";

import prisma from "@/lib/prisma";

/**
 * Fetches vendor profile for a specific user.
 */
export async function getVendorProfile(userId: string) {
    return await prisma.vendor.findUnique({
        where: { userId },
    });
}

/**
 * Fetches analytics for a vendor (total revenue, order count).
 */
export async function getVendorAnalytics(vendorId: string) {
    const orders = await prisma.orderItem.findMany({
        where: {
            product: { vendorId }
        },
        include: {
            order: true
        }
    });

    const totalRevenue = orders.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const totalOrders = new Set(orders.map((o: any) => o.orderId)).size;

    return {
        totalRevenue,
        totalOrders,
        recentOrders: orders.slice(0, 5)
    };
}

/**
 * Updates vendor status or profile.
 */
export async function updateVendorProfile(vendorId: string, data: any) {
    return await prisma.vendor.update({
        where: { id: vendorId },
        data
    });
}
