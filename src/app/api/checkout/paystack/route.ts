import { NextResponse } from "next/server";
import { paystack } from "@/lib/paystack";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { productId, email } = await request.json();

        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const amount = product.price + 45; // Same total as Stripe

        const response = await paystack.initializeTransaction(email, amount, {
            productId,
        });

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("Paystack Initialization Error:", error);
        return NextResponse.json({ error: "Failed to initialize regional payment" }, { status: 500 });
    }
}
