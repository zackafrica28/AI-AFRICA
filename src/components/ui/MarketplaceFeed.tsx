"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Button from "./Button";
import styles from "./MarketplaceFeed.module.css";

interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    images: string[];
    vendor?: {
        name: string;
    }
}

export default function MarketplaceFeed() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [category, setCategory] = useState("All");
    const [hasMore, setHasMore] = useState(true);
    const limit = 8;

    const categories = ["All", "Software", "Real Estate", "Electronics", "Logistics", "Energy"];

    const fetchProducts = async (newOffset: number, newCategory: string, reset: boolean = false) => {
        setLoading(true);
        try {
            const catParam = newCategory === "All" ? "" : `&category=${encodeURIComponent(newCategory)}`;
            const res = await fetch(`/api/products?limit=${limit}&offset=${newOffset}${catParam}`);
            const data: Product[] = await res.json();

            if (reset) {
                setProducts(data);
            } else {
                setProducts((prev) => [...prev, ...data]);
            }

            if (data.length < limit) setHasMore(false);
            else setHasMore(true);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(0, "All", true);
    }, []);

    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
        setOffset(0);
        fetchProducts(0, cat, true);
    };

    const handleLoadMore = () => {
        const nextOffset = offset + limit;
        setOffset(nextOffset);
        fetchProducts(nextOffset, category);
    };

    return (
        <div className={styles.container}>
            <div className={styles.filterBar}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${category === cat ? styles.active : ''}`}
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.feed}>
                {products.length === 0 && !loading ? (
                    <div className={styles.empty}>No assets found in this sector.</div>
                ) : (
                    products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))
                )}
            </div>

            {loading && (
                <div className={styles.loading}>
                    <div className="neon-spinner"></div>
                    <p>Synchronizing Nodes...</p>
                </div>
            )}

            {hasMore && !loading && (
                <div className={styles.footer}>
                    <Button variant="glass" onClick={handleLoadMore}>Load More Assets</Button>
                </div>
            )}
        </div>
    );
}
