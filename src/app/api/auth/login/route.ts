import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        const valid = await bcrypt.compare(
            body.password,
            user.password
        );

        if (!valid)
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        return NextResponse.json({ token, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
