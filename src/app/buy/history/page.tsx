"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import { Clock, Download, Package } from "lucide-react";
import styles from "./history.module.css";
import Button from "@/components/ui/Button";

export default function BuyHistory() {
    const history = [
        { id: "TX-9421", item: "Neural Vision Pro", date: "Jan 12, 2026", price: "$850.00", status: "Delivered" },
        { id: "TX-8832", item: "Solar Grid Link", date: "Dec 28, 2025", price: "$2,400.00", status: "Delivered" },
    ];

    return (
        <ModulePage title="Transaction History" subtitle="Comprehensive log of all neural and physical acquisitions.">
            <div className={styles.list}>
                {history.map((tx) => (
                    <div key={tx.id} className={styles.txCard}>
                        <div className={styles.icon}><Package size={20} /></div>
                        <div className={styles.info}>
                            <h3>{tx.item}</h3>
                            <p>ID: {tx.id} • {tx.date}</p>
                        </div>
                        <div className={styles.price}>{tx.price}</div>
                        <div className={styles.statusBadge}>{tx.status}</div>
                        <Button size="sm" variant="glass" leftIcon={<Download size={14} />}>Invoice</Button>
                    </div>
                ))}
            </div>
        </ModulePage>
    );
}
