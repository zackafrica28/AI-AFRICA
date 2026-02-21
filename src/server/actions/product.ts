"use server";

import { prisma } from "@/lib/prisma";

/**
 * Fetches all products with optional filters.
 */
export async function getProducts(limit: number = 12, offset: number = 0) {
    return await prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
    });
}

/**
 * Fetches a single product by its ID.
 */
export async function getProductById(id: string) {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            seller: true
        }
    });
}

/**
 * Creates a new product for a merchant/user.
 */
export async function createProduct(sellerId: string, data: any) {
    return await prisma.product.create({
        data: {
            title: data.title,
            description: data.description,
            price: data.price,
            image: data.image,
            sellerId,
        }
    });
}

/**
 * Fetches all products for a specific seller.
 */
export async function getVendorProducts(sellerId: string) {
    return await prisma.product.findMany({
        where: { sellerId },
        orderBy: { createdAt: "desc" }
    });
}

/**
 * Deletes a product.
 */
export async function deleteProduct(productId: string, sellerId: string) {
    return await prisma.product.delete({
        where: { id: productId, sellerId: sellerId }
    });
}
