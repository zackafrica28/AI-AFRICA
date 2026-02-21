"use server";

import { prisma } from "@/lib/prisma";

export async function getUserProfile(email: string) {
    return await prisma.user.findUnique({
        where: { email },
        include: {
            subscriptions: true,
            agents: true,
        },
    });
}

export async function updateUserProfile(userId: string, data: any) {
    return await prisma.user.update({
        where: { id: userId },
        data,
    });
}

export async function updateUserRole(userId: string, role: string) {
    return await prisma.user.update({
        where: { id: userId },
        data: { role: role as any },
    });
}

export async function getUserAnalytics(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            orders: true,
            agents: true,
        },
    });

    if (!user) return null;

    const totalSpent = user.orders.reduce((sum: number, order: any) => sum + order.total, 0);
    const activeAgents = user.agents.filter((a: any) => a.active === true).length;

    return {
        totalSpent,
        orderCount: user.orders.length,
        activeAgents,
    };
}
