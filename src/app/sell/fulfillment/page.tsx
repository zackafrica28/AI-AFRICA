"use client"

import { useEffect, useState } from "react"
import ModulePage from "@/components/ui/ModulePage"
import styles from "./fulfillment.module.css"

export default function FulfillmentPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/fulfillment")
            .then(res => res.json())
            .then(data => {
                setOrders(data.orders || [])
                setLoading(false)
            })
            .catch(err => {
                console.error("Fetch error:", err)
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <ModulePage title="Fulfillment Center" subtitle="Loading neural nodes...">
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="neon-spinner"></div>
            </div>
        </ModulePage>
    )

    return (
        <ModulePage title="Fulfillment Center" subtitle="Track and manage the delivery of goods and services.">
            <div className={styles.container}>
                {orders.length === 0 ? (
                    <div className="text-center py-10 text-muted">No active orders in the neural queue.</div>
                ) : (
                    <div className={styles.list}>
                        {orders.map((order: any) => (
                            <div key={order.id} className={`${styles.orderCard} glass`}>
                                <div className={styles.orderInfo}>
                                    <div className="flex justify-between items-start w-full">
                                        <div>
                                            <h4 className="text-accent font-bold text-lg">{order.product?.title || "Neural Asset"}</h4>
                                            <span className="text-xs text-muted block">Order ID: {order.id}</span>
                                            <span className="text-xs text-muted block">Buyer: {order.user?.email}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold neon-text">${order.total}</div>
                                            <div className="text-xs text-muted">{new Date(order.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <div className={`${styles.status} ${styles[order.status.toLowerCase()] || ''}`}>
                                            <span className="px-2 py-1 rounded bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ModulePage>
    )
}
