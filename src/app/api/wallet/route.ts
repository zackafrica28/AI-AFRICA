import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        const wallet = await prisma.wallet.findUnique({
            where: { userId: userId },
        });

        return NextResponse.json(wallet);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
