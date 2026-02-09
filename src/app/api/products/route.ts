import { NextResponse } from "next/server";
import { getProducts } from "@/server/actions/product";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "12");
        const offset = parseInt(searchParams.get("offset") || "0");
        const category = searchParams.get("category") || undefined;

        const products = await getProducts(limit, offset, category);
        return NextResponse.json(products);
    } catch (error) {
        console.error("API Error (Products):", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
