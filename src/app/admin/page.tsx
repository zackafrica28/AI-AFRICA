"use client";

import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import { Users, Store, Box, BarChart3, ShieldAlert } from "lucide-react";
import styles from "./admin.module.css";
import { getGlobalAnalytics } from "@/server/actions/admin";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const data = await getGlobalAnalytics();
                setStats(data);
            } catch (error) {
                console.error("Admin stats failed:", error);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    if (loading) return <ModulePage title="Securing Nexus..." subtitle="Authenticating Master Protocol."><div className="neon-spinner"></div></ModulePage>;

    return (
        <ModulePage title="Nexus Control Panel" subtitle="Global Platform Governance & Neural Health Monitoring.">
            <div className={styles.statsGrid}>
                <HolographicCard title="Global Users" variant="neon">
                    <div className={styles.stat}>
                        <Users size={32} />
                        <span>{stats?.userCount}</span>
                    </div>
                </HolographicCard>
                <HolographicCard title="Active Vendors" variant="glass">
                    <div className={styles.stat}>
                        <Store size={32} />
                        <span>{stats?.vendorCount}</span>
                    </div>
                </HolographicCard>
                <HolographicCard title="Asset Nodes" variant="glass">
                    <div className={styles.stat}>
                        <Box size={32} />
                        <span>{stats?.productCount}</span>
                    </div>
                </HolographicCard>
                <HolographicCard title="Global Revenue" variant="neon">
                    <div className={styles.stat}>
                        <BarChart3 size={32} />
                        <span>${stats?.totalRevenue.toLocaleString()}</span>
                    </div>
                </HolographicCard>
            </div>

            <div className={styles.alertPanel}>
                <HolographicCard title="System Alerts" variant="neon">
                    <div className={styles.alert}>
                        <ShieldAlert size={20} className={styles.warning} />
                        <span>3 Pending Vendor Applications Requiring Review</span>
                    </div>
                    <div className={styles.alert}>
                        <ShieldAlert size={20} className={styles.info} />
                        <span>Transaction Throughput: 42 TPS (Nominal)</span>
                    </div>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
