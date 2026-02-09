"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import styles from "./details.module.css";
import Image from "next/image";
import Link from "next/link";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
}

export default function ProductDetails() {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        async function fetchProduct() {
            try {
                // In a real app, this would be an API call
                const res = await fetch(`/api/products/${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    if (loading) return <ModulePage title="Syncing Neural Data..." subtitle="Please wait."><div className="neon-spinner"></div></ModulePage>;

    if (!product) {
        return (
            <ModulePage title="Asset Not Found" subtitle="Requested neural node does not exist in the marketplace.">
                <Link href="/buy">
                    <Button variant="glass">Back to Market</Button>
                </Link>
            </ModulePage>
        );
    }

    return (
        <ModulePage title={product.title} subtitle={`${product.category} | Synced via Live Neural Feed`}>
            <div className={styles.layout}>
                <div className={styles.main}>
                    <HolographicCard variant="glass" className={styles.visuals}>
                        <Image
                            src={product.images[0] || "https://via.placeholder.com/600x400"}
                            alt={product.title}
                            width={600}
                            height={400}
                            className="w-full h-auto"
                        />
                    </HolographicCard>

                    <div className={styles.tabs}>
                        <button className={styles.activeTab}>Specifications</button>
                        <button>Sustainability</button>
                        <button>Reviews</button>
                    </div>

                    <div className={styles.description}>
                        <p>{product.description}</p>
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    <HolographicCard title="Market Edition" variant="neon">
                        <h2 className={styles.price}>${product.price.toLocaleString()}</h2>
                        <p className={styles.limited}>Availability: {product.stock > 0 ? `${product.stock} Units In Node` : "DEPLETED"}</p>

                        <div className={styles.buyingControls}>
                            <Link href={`/buy/checkout?id=${product.id}`} className={styles.fullWidth}>
                                <Button className={styles.fullWidth} variant="primary">Acquire Now</Button>
                            </Link>
                            <Button className={styles.fullWidth} variant="glass">Add to Wishlist</Button>
                        </div>

                        <div className={styles.perks}>
                            <div className={styles.perk}><ShieldCheck size={16} /> <span>3yr Neural Warranty</span></div>
                            <div className={styles.perk}><Truck size={16} /> <span>Express Node Delivery</span></div>
                            <div className={styles.perk}><RefreshCcw size={16} /> <span>30 Day Synapse Return</span></div>
                        </div>
                    </HolographicCard>
                </aside>
            </div>
        </ModulePage>
    );
}

