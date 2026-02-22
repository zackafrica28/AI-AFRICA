"use server";

import { prisma } from "@/lib/prisma";

/**
 * Synchronizes a Firebase user with the PostgreSQL database.
 * This should be called after a successful login or signup.
 */
export async function syncUserWithDb(firebaseUid: string, email: string, name?: string) {
    try {
        const role = email.includes("zackawudu") ? "CEO" : "USER";

        const user = await prisma.user.upsert({
            where: { firebaseUid },
            update: {
                email,
                name: name || undefined,
            },
            create: {
                firebaseUid,
                email,
                password: "", // Handled by Firebase, but schema might require it
                name: name || undefined,
                role: role as any,
            },
        });

        return user;
    } catch (error) {
        console.error("Error syncing user with database:", error);
        throw error;
    }
}
