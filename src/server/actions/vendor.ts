"use server";

import { prisma } from "@/lib/prisma";

/**
 * Fetches vendor/business profile for a specific user.
 */
export async function getVendorProfile(userId: string) {
    return await prisma.business.findUnique({
        where: { userId },
    });
}

/**
 * Fetches analytics for a business (total revenue, order count).
 */
export async function getVendorAnalytics(userId: string) {
    const orders = await prisma.order.findMany({
        where: {
            product: { sellerId: userId }
        },
        include: {
            product: true,
            user: true
        }
    });

    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
    const totalOrders = orders.length;

    return {
        totalRevenue,
        totalOrders,
        recentOrders: orders.slice(0, 5)
    };
}

/**
 * Creates a new business profile for a user.
 */
export async function createVendor(userId: string, name: string, description: string) {
    return await prisma.business.create({
        data: {
            userId,
            name,
            description,
        }
    });
}

/**
 * Updates business status or profile.
 */
export async function updateVendorProfile(userId: string, data: any) {
    return await prisma.business.update({
        where: { userId },
        data
    });
}
