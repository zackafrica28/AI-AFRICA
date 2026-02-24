import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                product: true,
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json({
            success: true,
            orders
        })

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { success: false, error: "Failed to fetch fulfillment orders" },
            { status: 500 }
        )
    }
}
