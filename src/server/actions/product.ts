"use server";

import prisma from "@/lib/prisma";

export async function getProducts(options: {
    category?: string;
    limit?: number;
    offset?: number;
} = {}) {
    const { category, limit = 20, offset = 0 } = options;

    try {
        const products = await prisma.product.findMany({
            where: category ? { category } : {},
            take: limit,
            skip: offset,
            include: {
                vendor: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductById(id: string) {
    try {
        return await prisma.product.findUnique({
            where: { id },
            include: {
                vendor: true,
            },
        });
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
}
