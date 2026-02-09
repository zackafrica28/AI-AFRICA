"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { Lock, ShieldCheck } from "lucide-react";
import styles from "./checkout.module.css";
import { useAuth } from "@/context/AuthContext";

interface Product {
    id: string;
    title: string;
    price: number;
}

export default function BuyCheckout() {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const { user } = useAuth();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching product for checkout:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    const handleCheckout = async () => {
        if (!product || !user) return;
        setProcessing(true);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product.id,
                    email: user.email,
                }),
            });

            const { url, error } = await res.json();
            if (url) {
                window.location.href = url;
            } else {
                alert(error || "Failed to initiate checkout");
            }
        } catch (err) {
            console.error("Checkout failed:", err);
            alert("Checkout system currently under neural maintenance.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <ModulePage title="Initializing Link..." subtitle="Decrypting transaction layer."><div className="neon-spinner"></div></ModulePage>;

    if (!product) return <ModulePage title="Invalid Link" subtitle="Could not resolve purchase node."><Link href="/buy"><Button variant="glass">Return to Market</Button></Link></ModulePage>;

    const total = product.price + 45; // Fixed delivery for now

    return (
        <ModulePage title="Quantum Checkout" subtitle="Secure your order through the neural transaction layer.">
            <div className={styles.layout}>
                <div className={styles.main}>
                    <HolographicCard title="Delivery Coordinates" variant="glass">
                        <div className={styles.field}>
                            <label>Shipping Hub</label>
                            <input type="text" placeholder="e.g. Lagos Terminal 4" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label>Contact Protocol</label>
                            <input type="email" value={user?.email || ""} readOnly className={styles.input} />
                        </div>
                    </HolographicCard>
                </div>

                <aside className={styles.sidebar}>
                    <HolographicCard title="Order Summary" variant="neon">
                        <div className={styles.summaryList}>
                            <div className={styles.item}><span>{product.title}</span><span>${product.price.toLocaleString()}</span></div>
                            <div className={styles.item}><span>Neural Delivery</span><span>$45.00</span></div>
                            <div className={styles.total}><span>Total</span><span>${total.toLocaleString()}</span></div>
                        </div>
                        <Button
                            className={styles.fullWidth}
                            variant="primary"
                            onClick={handleCheckout}
                            disabled={processing}
                        >
                            {processing ? "Authorizing..." : "Authorize Purchase"}
                        </Button>
                        <div className={styles.secure}>
                            <ShieldCheck size={14} />
                            <span>AES-512 Encrypted Transaction</span>
                        </div>
                    </HolographicCard>
                </aside>
            </div>
        </ModulePage>
    );
}

import Link from "next/link";

