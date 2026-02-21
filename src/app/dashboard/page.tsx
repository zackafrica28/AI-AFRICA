"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import HolographicCard from "@/components/ui/HolographicCard";
import {
    TrendingUp,
    Users,
    ShoppingBag,
    Cpu,
    Plus
} from "lucide-react";
import styles from "./dashboard.module.css";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserAnalytics } from "@/server/actions/user";

export default function DashboardPage() {
    const { profile, user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            setLoading(true);
            getUserAnalytics(user.uid).then((data) => {
                setStats(data);
                setLoading(false);
            });
        }
    }, [user?.uid]);

    if (loading) {
        return <DashboardLayout><div className="flex items-center justify-center min-h-[60vh]"><div className="neon-spinner"></div></div></DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className={styles.container}>
                {/* Header Section */}
                <header className={styles.header}>
                    <div className={styles.welcome}>
                        <h1 className={styles.title}>System Overview</h1>
                        <p className={styles.subtitle}>Welcome back, {profile?.name || "Entrepreneur"}. Your business nodes are active.</p>
                    </div>
                    <div className={styles.actions}>
                        <Link href="/sell/listings" className={styles.primaryBtn}>
                            <Plus size={18} />
                            <span>Add Product</span>
                        </Link>
                    </div>
                </header>

                {/* Core Metrics */}
                <section className={styles.statsGrid}>
                    <StatCard
                        label="Total Revenue"
                        value={stats ? `$${stats.totalSpent.toLocaleString()}` : "$0.00"}
                        trend={{ value: 12.5, isUp: true }}
                        icon={TrendingUp}
                        color="#ff6600"
                    />
                    <StatCard
                        label="Active Customers"
                        value={stats?.customerCount || "128"}
                        trend={{ value: 4.2, isUp: true }}
                        icon={Users}
                        color="#ff8c00"
                    />
                    <StatCard
                        label="AI Agents Active"
                        value={stats?.activeAgents || "0"}
                        icon={Cpu}
                        color="#111827"
                    />
                    <StatCard
                        label="Market Reach"
                        value="14 Nodes"
                        icon={ShoppingBag}
                        color="#ff6600"
                    />
                </section>

                {/* Operational Content */}
                <div className={styles.mainGrid}>
                    <div className={styles.leftCol}>
                        <HolographicCard title="Real-Time Revenue" subtitle="Regional sales performance across Africa">
                            <div className={styles.chartPlaceholder}>
                                {[60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                                    <div key={i} className={styles.barWrapper}>
                                        <div className={styles.bar} style={{ height: `${h}%` }} />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.chartLabels}>
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </HolographicCard>

                        <HolographicCard title="AI Agent Intelligence" variant="glass">
                            <div className={styles.agentList}>
                                <div className={styles.agentItem}>
                                    <div className={styles.agentInfo}>
                                        <div className={styles.agentStatus} />
                                        <span>Sales Optimizer Agent</span>
                                    </div>
                                    <span className={styles.agentTask}>Analyzing MoMo trends...</span>
                                </div>
                                <div className={styles.agentItem}>
                                    <div className={styles.agentInfo}>
                                        <div className={styles.agentStatus} />
                                        <span>Inventory Scraper</span>
                                    </div>
                                    <span className={styles.agentTask}>Restocking Solar Nodes</span>
                                </div>
                            </div>
                        </HolographicCard>
                    </div>

                    <div className={styles.rightCol}>
                        <HolographicCard title="Recent Transactions" subtitle="MoMo & Card Payments">
                            <div className={styles.transactionList}>
                                {[
                                    { name: "John D.", method: "MTN MoMo", amount: "+$45.00", time: "2m ago" },
                                    { name: "Sarah K.", method: "Airtel Money", amount: "+$120.00", time: "15m ago" },
                                    { name: "Tech Corp", method: "Visa / Paystack", amount: "+$1,200.00", time: "1h ago" },
                                ].map((tx, i) => (
                                    <div key={i} className={styles.txItem}>
                                        <div className={styles.txInfo}>
                                            <p className={tx.amount.startsWith('+') ? styles.txNamePositive : styles.txName}>{tx.name}</p>
                                            <span>{tx.method}</span>
                                        </div>
                                        <div className={styles.txAmount}>
                                            <p>{tx.amount}</p>
                                            <span>{tx.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </HolographicCard>

                        <HolographicCard title="System Health" variant="solid">
                            <div className={styles.healthStatus}>
                                <div className={styles.healthRow}>
                                    <span>Network Latency</span>
                                    <strong>12ms</strong>
                                </div>
                                <div className={styles.healthRow}>
                                    <span>Database Nodes</span>
                                    <strong>Active (5/5)</strong>
                                </div>
                            </div>
                        </HolographicCard>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
