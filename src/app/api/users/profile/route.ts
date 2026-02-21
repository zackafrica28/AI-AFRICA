import { NextResponse } from "next/server";
import { getUserProfile, updateUserProfile } from "@/server/actions/user";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

        const user = await getUserProfile(email);
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { userId, ...updateData } = data;

        if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

        const user = await updateUserProfile(userId, updateData);
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
