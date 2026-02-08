"use client";
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import HolographicCard from "@/components/ui/HolographicCard";
import {
    TrendingUp,
    Users,
    ShoppingBag,
    Activity,
    Zap,
    ShieldCheck,
    Cpu,
    Bell,
    ArrowRight,
    Plus
} from "lucide-react";
import styles from "./dashboard.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { profile } = useAuth();

    return (
        <DashboardLayout>
            <div className={styles.grid}>
                {/* Header Section */}
                <section className={styles.welcome}>
                    <div className={styles.welcomeText}>
                        <h1 className="neon-text">Command Center</h1>
                        <p>Node Status: <span className={styles.online}>Online</span> • Role: <strong>{profile?.role || "GUEST"}</strong></p>
                    </div>
                    <div className={styles.quickActions}>
                        <button className={styles.actionCircle} title="New Automation"><Plus size={18} /></button>
                        <button className={styles.actionCircle} title="Notifications"><Bell size={18} /><span className={styles.dot} /></button>
                    </div>
                </section>

                {/* Global Financial Metrics */}
                <section className={styles.stats}>
                    <StatCard label="Total Revenue" value="$450,290" trend={{ value: 12, isUp: true }} icon={TrendingUp} />
                    <StatCard label="Active Clients" value="8,421" trend={{ value: 8, isUp: true }} icon={Users} color="#7000ff" />
                    <StatCard label="Daily Orders" value="142" trend={{ value: 3, isUp: false }} icon={ShoppingBag} color="#10b981" />
                    <StatCard label="AI Efficiency" value="94.2%" icon={Zap} color="#f97316" />
                </section>

                {/* Main Operational Hub */}
                <div className={styles.contentGrid}>
                    <div className={styles.mainColumn}>
                        {/* Active Modules Grid */}
                        <HolographicCard title="Active Operational Modules" subtitle="One-touch access to system sectors">
                            <div className={styles.modulesGrid}>
                                {[
                                    { name: "AI OS", icon: Cpu, href: "/ai-os/overview", color: "var(--accent)" },
                                    { name: "CRM", icon: Users, href: "/crm/leads", color: "#7000ff" },
                                    { name: "Marketplace", icon: ShoppingBag, href: "/buy/marketplace", color: "#10b981" },
                                    { name: "Logistics", icon: Activity, href: "/sell/listings", color: "#f97316" },
                                ].map((mod) => (
                                    <Link href={mod.href} key={mod.name} className={styles.moduleLink}>
                                        <mod.icon size={24} style={{ color: mod.color }} />
                                        <span>{mod.name}</span>
                                        <ArrowRight size={14} className={styles.arrow} />
                                    </Link>
                                ))}
                            </div>
                        </HolographicCard>

                        <HolographicCard title="AI Strategic Recommendations" variant="neon">
                            <div className={styles.recommendations}>
                                <div className={styles.recItem}>
                                    <div className={styles.recIcon}><TrendingUp size={18} /></div>
                                    <div className={styles.recText}>
                                        <p>Market Trend Alert: Solar components in West Africa are surging.</p>
                                        <Link href="/buy/marketplace">Scale Inventory</Link>
                                    </div>
                                </div>
                                <div className={styles.recItem}>
                                    <div className={styles.recIcon}><Cpu size={18} /></div>
                                    <div className={styles.recText}>
                                        <p>Optimization: Web Scraper Node-4 is idle. Re-allocate to Sentiment Analysis?</p>
                                        <Link href="/ai-os/automations">Approve Re-allocation</Link>
                                    </div>
                                </div>
                            </div>
                        </HolographicCard>
                    </div>

                    <aside className={styles.sideColumn}>
                        <HolographicCard title="System Health" variant="glass">
                            <div className={styles.healthStats}>
                                <div className={styles.healthItem}>
                                    <span>CPU Load</span>
                                    <div className={styles.progressBar}><div className={styles.progress} style={{ width: '32%' }} /></div>
                                </div>
                                <div className={styles.healthItem}>
                                    <span>Storage Node-A</span>
                                    <div className={styles.progressBar}><div className={styles.progress} style={{ width: '68%' }} /></div>
                                </div>
                                <div className={styles.healthItem}>
                                    <span>Neural Latency</span>
                                    <div className={styles.progressBar}><div className={styles.progress} style={{ width: '12%', background: '#10b981' }} /></div>
                                </div>
                            </div>
                        </HolographicCard>

                        <HolographicCard title="Neural Notifications" interactive={false}>
                            <div className={styles.notifications}>
                                <div className={styles.notif}>
                                    <div className={styles.notifDot} />
                                    <p>Subscription payout secured via Stripe.</p>
                                    <span>2 mins ago</span>
                                </div>
                                <div className={styles.notif}>
                                    <div className={styles.notifDot} style={{ background: '#f97316' }} />
                                    <p>System update v4.2 stable deployment ready.</p>
                                    <span>1 hour ago</span>
                                </div>
                            </div>
                        </HolographicCard>
                    </aside>
                </div>
            </div>
        </DashboardLayout>
    );
}
