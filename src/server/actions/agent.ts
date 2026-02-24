"use server";

import { prisma } from "@/lib/prisma";

export async function getUserAgents(userId: string) {
    return await prisma.agent.findMany({
        where: { userId },
    });
}

export async function createAgent(userId: string, type: string) {
    return await prisma.agent.create({
        data: {
            userId,
            name: type,
            type,
            active: true,
        },
    });
}

export async function updateAgentState(agentId: string, active: boolean) {
    return await prisma.agent.update({
        where: { id: agentId },
        data: { active },
    });
}

export async function deleteAgent(agentId: string) {
    return await prisma.agent.delete({
        where: { id: agentId },
    });
}
