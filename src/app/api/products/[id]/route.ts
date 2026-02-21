import { NextResponse } from "next/server";
import { getProductById } from "@/server/actions/product";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("API Error (Product Detail):", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
