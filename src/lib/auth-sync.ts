"use server";

import prisma from "@/lib/prisma";

/**
 * Synchronizes a Firebase user with the PostgreSQL database.
 * This should be called after a successful login or signup.
 */
export async function syncUserWithDb(firebaseUid: string, email: string, name?: string) {
    try {
        const user = await prisma.user.upsert({
            where: { firebaseUid },
            update: {
                email,
                name: name || undefined,
            },
            create: {
                firebaseUid,
                email,
                name: name || undefined,
                role: "USER", // Default role
            },
        });

        return user;
    } catch (error) {
        console.error("Error syncing user with database:", error);
        throw error;
    }
}
