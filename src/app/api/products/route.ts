import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/server/actions/product";

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

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { vendorId, ...productData } = data;

        if (!vendorId) {
            return NextResponse.json({ error: "Vendor ID is required" }, { status: 400 });
        }

        const product = await createProduct(vendorId, productData);
        return NextResponse.json(product);
    } catch (error: any) {
        console.error("API Error (Create Product):", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
