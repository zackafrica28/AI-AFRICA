import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const hashed = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashed,
                name: body.name,
                phone: body.phone,
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
