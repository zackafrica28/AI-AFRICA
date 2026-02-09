"use client";

import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import { Download, Package } from "lucide-react";
import styles from "./history.module.css";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/server/actions/order";

interface Order {
    id: string;
    createdAt: Date;
    total: number;
    status: string;
    items: {
        product: {
            title: string;
        };
    }[];
}

export default function BuyHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        async function fetchOrders() {
            try {
                const data = await getUserOrders(user!.email!);
                // Convert Prisma result to our interface if needed
                setOrders(data as any);
            } catch (error) {
                console.error("Error loading order history:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [user?.email]);

    return (
        <ModulePage title="Transaction History" subtitle="Comprehensive log of all neural and physical acquisitions.">
            {loading ? (
                <div className="neon-spinner"></div>
            ) : orders.length === 0 ? (
                <div className={styles.empty}>
                    <p>No transaction logs detected in local nodes.</p>
                </div>
            ) : (
                <div className={styles.list}>
                    {orders.map((order) => (
                        <div key={order.id} className={styles.txCard}>
                            <div className={styles.icon}><Package size={20} /></div>
                            <div className={styles.info}>
                                <h3>{order.items[0]?.product.title || "Market Item"}</h3>
                                <p>ID: {order.id.slice(0, 8)} • {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className={styles.price}>${order.total.toLocaleString()}</div>
                            <div className={styles.statusBadge}>{order.status}</div>
                            <Button size="sm" variant="glass" leftIcon={<Download size={14} />}>Invoice</Button>
                        </div>
                    ))}
                </div>
            )}
        </ModulePage>
    );
}

