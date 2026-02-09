import { NextResponse } from "next/server";
import { getProducts } from "@/server/actions/product";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    try {
        const products = await getProducts({ category, limit, offset });
        return NextResponse.json(products);
    } catch (error) {
        console.error("API Error (Products):", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
