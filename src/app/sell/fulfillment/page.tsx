"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import styles from "./fulfillment.module.css";

export default function SellFulfillment() {
    const orders = [
        { id: "#AF-1024", item: "NPU-X1 Bundle", status: "Processing", date: "Feb 07, 2026" },
        { id: "#AF-1025", item: "Solar Grid Link", status: "In Transit", date: "Feb 07, 2026" },
        { id: "#AF-1020", item: "Neural API Key", status: "Completed", date: "Feb 05, 2026" },
    ];

    return (
        <ModulePage title="Order Fulfillment" subtitle="Track and manage the delivery of goods and services.">
            <div className={styles.list}>
                {orders.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderIcon}><Package size={24} /></div>
                        <div className={styles.orderInfo}>
                            <h4>{order.item}</h4>
                            <span>Order ID: {order.id} • {order.date}</span>
                        </div>
                        <div className={`${styles.status} ${styles[order.status.replace(' ', '').toLowerCase()]}`}>
                            {order.status === "Processing" && <Clock size={14} />}
                            {order.status === "In Transit" && <Truck size={14} />}
                            {order.status === "Completed" && <CheckCircle size={14} />}
                            <span>{order.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </ModulePage>
    );
}
