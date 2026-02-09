"use server";

import prisma from "@/lib/prisma";

/**
 * Fetches the order history for a specific user based on their email.
 */
export async function getUserOrders(email: string) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                user: { email }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return orders;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
}
