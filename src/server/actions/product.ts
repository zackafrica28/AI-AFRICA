"use server";

import prisma from "@/lib/prisma";

/**
 * Creates a new product for a vendor.
 */
export async function createProduct(vendorId: string, data: any) {
    return await prisma.product.create({
        data: {
            ...data,
            vendorId,
        }
    });
}

/**
 * Fetches all products for a specific vendor.
 */
export async function getVendorProducts(vendorId: string) {
    return await prisma.product.findMany({
        where: { vendorId },
        orderBy: { createdAt: "desc" }
    });
}

/**
 * Deletes a product.
 */
export async function deleteProduct(productId: string, vendorId: string) {
    return await prisma.product.delete({
        where: { id: productId, vendorId }
    });
}
