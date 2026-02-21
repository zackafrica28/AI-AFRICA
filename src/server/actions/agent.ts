"use server";

import prisma from "@/lib/prisma";

export async function getUserAgents(userId: string) {
    return await prisma.agent.findMany({
        where: { userId },
    });
}

export async function createAgent(userId: string, type: string, config: any = {}) {
    return await prisma.agent.create({
        data: {
            userId,
            type,
            config,
            state: "IDLE",
        },
    });
}

export async function updateAgentState(agentId: string, state: string) {
    return await prisma.agent.update({
        where: { id: agentId },
        data: { state },
    });
}

export async function deleteAgent(agentId: string) {
    return await prisma.agent.delete({
        where: { id: agentId },
    });
}
