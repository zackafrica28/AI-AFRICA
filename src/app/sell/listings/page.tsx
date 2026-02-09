"use client";

import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import Button from "@/components/ui/Button";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import styles from "./listings.module.css";
import { useAuth } from "@/context/AuthContext";
import { getVendorProfile } from "@/server/actions/vendor";
import { getVendorProducts, deleteProduct } from "@/server/actions/product";
import Link from "next/link";

export default function SellListings() {
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [vendor, setVendor] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        async function loadListingData() {
            try {
                const profile = await getVendorProfile(user!.uid);
                if (profile) {
                    setVendor(profile);
                    const list = await getVendorProducts(profile.id);
                    setProducts(list);
                }
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        }

        loadListingData();
    }, [user?.uid]);

    const handleDelete = async (id: string) => {
        if (!confirm("Confirm asset deletion? This cannot be undone.")) return;
        try {
            await deleteProduct(id, vendor.id);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            alert("Deletion failed. Node protected.");
        }
    };

    if (loading) return <ModulePage title="Scanning Inventory..." subtitle="Retrieving digital assets."><div className="neon-spinner"></div></ModulePage>;

    return (
        <ModulePage title="Asset Management" subtitle="Control and deploy your products across the global grid.">
            <div className={styles.header}>
                <Link href="/sell/listings/new">
                    <Button variant="primary" leftIcon={<Plus size={18} />}>New Asset</Button>
                </Link>
            </div>

            <div className={styles.grid}>
                {products.length === 0 ? (
                    <div className={styles.empty}>
                        <p>No active assets detected in your node.</p>
                        <Link href="/sell/listings/new"><Button variant="glass">Create First Product</Button></Link>
                    </div>
                ) : (
                    products.map((p) => (
                        <div key={p.id} className={styles.card}>
                            <div className={styles.media}>
                                <img src={p.images[0] || "/placeholder.jpg"} alt={p.title} />
                            </div>
                            <div className={styles.info}>
                                <h3>{p.title}</h3>
                                <p>${p.price.toLocaleString()} • {p.category}</p>
                            </div>
                            <div className={styles.actions}>
                                <Button size="sm" variant="glass"><Edit size={14} /></Button>
                                <Button size="sm" variant="glass" onClick={() => handleDelete(p.id)}><Trash2 size={14} /></Button>
                                <Link href={`/buy/details?id=${p.id}`}>
                                    <Button size="sm" variant="glass"><ExternalLink size={14} /></Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </ModulePage>
    );
}
