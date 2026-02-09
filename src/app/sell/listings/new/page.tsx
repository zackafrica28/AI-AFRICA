"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { getVendorProfile } from "@/server/actions/vendor";
import { createProduct } from "@/server/actions/product";
import styles from "./new-listing.module.css";

export default function NewListing() {
    const { user } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Software",
        image: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.uid) return;
        setSubmitting(true);

        try {
            const vendor = await getVendorProfile(user.uid);
            if (!vendor) throw new Error("Vendor profile not found");

            await createProduct(vendor.id, {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                images: [formData.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"],
                stock: 100,
            });

            router.push("/sell/listings");
        } catch (error) {
            console.error("Failed to create product:", error);
            alert("Node creation failed. Check neural link.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ModulePage title="Deploy New Asset" subtitle="Publish your digital or physical inventory to the AI-AFRICA network.">
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <HolographicCard title="Asset Properties" variant=" neon">
                        <div className={styles.field}>
                            <label>Product Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Neural Link Hub"
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Price (USD)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="49.99"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Category</label>
                                <select
                                    className={styles.input}
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Software</option>
                                    <option>Real Estate</option>
                                    <option>Electronics</option>
                                    <option>Logistics</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label>Description</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Details of your asset..."
                                className={styles.textarea}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Cover Image URL</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                                className={styles.input}
                            />
                        </div>
                        <Button
                            className={styles.submit}
                            variant="primary"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Deploying..." : "Launch Asset"}
                        </Button>
                    </HolographicCard>
                </form>
            </div>
        </ModulePage>
    );
}
