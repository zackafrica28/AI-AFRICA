"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { PlusCircle, Edit3, Eye, Trash2 } from "lucide-react";
import styles from "./listings.module.css";

export default function SellListings() {
    const listings = [
        { id: 1, name: "Node Express Service", status: "Active", views: 1240, sales: 42 },
        { id: 2, name: "Neural Vision API", status: "Active", views: 850, sales: 18 },
        { id: 3, name: "Dataset Alpha-7", status: "Review", views: 0, sales: 0 },
    ];

    return (
        <ModulePage title="My Merchant Listings" subtitle="Manage your digital and physical assets for sale on the marketplace.">
            <div className={styles.header}>
                <Button leftIcon={<PlusCircle size={18} />}>Create New Listing</Button>
            </div>

            <div className={styles.table}>
                <div className={styles.thead}>
                    <span>Product</span>
                    <span>Status</span>
                    <span>Views</span>
                    <span>Sales</span>
                    <span>Actions</span>
                </div>
                {listings.map((item) => (
                    <div key={item.id} className={styles.trow}>
                        <span className={styles.name}>{item.name}</span>
                        <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>{item.status}</span>
                        <span>{item.views}</span>
                        <span>{item.sales}</span>
                        <div className={styles.actions}>
                            <button title="View"><Eye size={16} /></button>
                            <button title="Edit"><Edit3 size={16} /></button>
                            <button title="Delete" className={styles.delete}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </ModulePage>
    );
}
