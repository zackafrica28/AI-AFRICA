"use server";

import { prisma } from "@/lib/prisma";

export async function getLeads(userId: string) {
    return await prisma.lead.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}

export async function createLead(userId: string, data: any) {
    return await prisma.lead.create({
        data: {
            ...data,
            userId,
        },
    });
}

export async function updateLeadStatus(leadId: string, status: string) {
    return await prisma.lead.update({
        where: { id: leadId },
        data: { status },
    });
}

export async function getPipelineStats(userId: string) {
    const leads = await prisma.lead.findMany({
        where: { userId },
    });

    const totalValue = leads.reduce((sum: number, lead: any) => sum + (lead.value || 0), 0);

    const statusCounts = leads.reduce((acc: any, lead: any) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
    }, {});

    return {
        totalValue,
        count: leads.length,
        statusCounts,
    };
}
export async function getDeals(userId: string) {
    return await prisma.deal.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { customer: true }
    });
}

export async function createDeal(userId: string, data: any) {
    return await prisma.deal.create({
        data: {
            ...data,
            userId,
        },
    });
}

export async function getCustomers(userId: string) {
    return await prisma.customer.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}

export async function createActivity(userId: string, data: { type: string; description: string; relatedTo?: string }) {
    return await prisma.activity.create({
        data: {
            ...data,
            userId,
        },
    });
}
