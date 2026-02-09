"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./MarketplaceFeed.module.css";

interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    category: string;
    vendor: {
        name: string;
    };
}

export default function MarketplaceFeed({ category }: { category?: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const url = category
                    ? `/api/products?category=${encodeURIComponent(category)}`
                    : "/api/products";
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [category]);

    if (loading) {
        return (
            <div className={styles.loader}>
                <div className="neon-spinner"></div>
                <p>Syncing Marketplace Nodes...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No neural assets found in this sector.</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.images[0] || "https://via.placeholder.com/400"}
                    category={product.category}
                    vendorName={product.vendor.name}
                />
            ))}
        </div>
    );
}
