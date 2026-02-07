"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import HolographicCard from "@/components/ui/HolographicCard";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import {
    TrendingUp,
    Users,
    ShoppingBag,
    Activity,
    Globe,
    Zap,
    ShieldCheck,
    Cpu
} from "lucide-react";
import styles from "./dashboard.module.css";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className={styles.grid}>
                {/* Welcome Section */}
                <section className={styles.welcome}>
                    <div className={styles.welcomeText}>
                        <h1 className="neon-text">Neural Network Overview</h1>
                        <p>System Status: <span className={styles.online}>Online</span> • Sector: Africa-Core-1</p>
                    </div>
                    <div className={styles.quickActions}>
                        <ThemeSwitcher />
                    </div>
                </section>

                {/* Stats Grid */}
                <section className={styles.stats}>
                    <StatCard label="Total Revenue" value="$4.2M" trend={{ value: 12, isUp: true }} icon={TrendingUp} />
                    <StatCard label="Active Clients" value="12,482" trend={{ value: 8, isUp: true }} icon={Users} color="#7000ff" />
                    <StatCard label="Global Orders" value="842" trend={{ value: 3, isUp: false }} icon={ShoppingBag} color="#10b981" />
                    <StatCard label="System Sync" value="99.9%" icon={Activity} color="#f97316" />
                </section>

                {/* Main Sections */}
                <div className={styles.contentGrid}>
                    <HolographicCard title="Live Intelligence Feed" subtitle="Real-time data stream">
                        <div className={styles.feedPlaceholder}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={styles.feedItem}>
                                    <div className={styles.feedDot} />
                                    <div className={styles.feedContent}>
                                        <p className={styles.feedTitle}>New Procurement Request from Lagos Hub</p>
                                        <span>Sector: Infrastructure • 2 mins ago</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </HolographicCard>

                    <div className={styles.sideColumn}>
                        <HolographicCard title="System Health" variant="neon">
                            <div className={styles.healthStats}>
                                <div className={styles.healthItem}>
                                    <span>Processor Heat</span>
                                    <div className={styles.progressBar}><div className={styles.progress} style={{ width: '45%' }} /></div>
                                </div>
                                <div className={styles.healthItem}>
                                    <span>Bandwidth</span>
                                    <div className={styles.progressBar}><div className={styles.progress} style={{ width: '82%' }} /></div>
                                </div>
                            </div>
                        </HolographicCard>

                        <HolographicCard title="Quick Terminal" interactive={false}>
                            <div className={styles.terminal}>
                                <p>> Initializing AI OS...</p>
                                <p>> Neural link established.</p>
                                <p>> Scanning for opportunities...</p>
                                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
                            </div>
                        </HolographicCard>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
