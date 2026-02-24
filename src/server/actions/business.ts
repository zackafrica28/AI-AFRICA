"use server";

import { prisma } from "@/lib/prisma";

export async function createBusiness(userId: string, data: {
    name: string;
    industry: string;
    momoNumber: string;
    momoNetwork: string;
}) {
    try {
        const business = await prisma.business.create({
            data: {
                userId,
                name: data.name,
                industry: data.industry,
                momoNumber: data.momoNumber,
                momoNetwork: data.momoNetwork,
            }
        });
        return { success: true, business };
    } catch (error: any) {
        console.error("Failed to create business:", error);
        return { success: false, error: error.message };
    }
}

export async function getBusinessStats(userId: string) {
    try {
        const business = await prisma.business.findUnique({
            where: { userId },
            include: {
                user: {
                    include: {
                        products: true,
                        customers: true,
                    }
                }
            }
        });

        if (!business) return null;

        // Simulate revenue growth for demo purposes
        return {
            balance: business.balance,
            productCount: (business as any).user.products.length,
            customerCount: (business as any).user.customers.length,
            revenueHistory: [400, 600, 800, 1200, 1100, 1500, 2000],
        };
    } catch (error) {
        return null;
    }
}
