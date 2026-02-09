"use client";

import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { TrendingUp, Package, DollarSign, Plus, Globe } from "lucide-react";
import styles from "./sell.module.css";
import { useAuth } from "@/context/AuthContext";
import { getVendorProfile, getVendorAnalytics } from "@/server/actions/vendor";
import Link from "next/link";

interface Analytics {
    totalRevenue: number;
    totalOrders: number;
    recentOrders: any[];
}

export default function SellPage() {
    const { user } = useAuth();
    const [vendor, setVendor] = useState<any>(null);
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        async function loadVendorData() {
            try {
                const profile = await getVendorProfile(user!.uid);
                if (profile) {
                    setVendor(profile);
                    const stats = await getVendorAnalytics(profile.id);
                    setAnalytics(stats);
                }
            } catch (error) {
                console.error("Error loading vendor data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadVendorData();
    }, [user?.uid]);

    if (loading) return <ModulePage title="Syncing Node..." subtitle="Verifying vendor credentials."><div className="neon-spinner"></div></ModulePage>;

    if (!vendor) {
        return (
            <ModulePage title="Launch Your Empire" subtitle="Transition from consumer to global distributor on the AI-AFRICA network.">
                <div className={styles.onboarding}>
                    <HolographicCard title="Vendor Protocol" variant="neon">
                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <Globe size={24} />
                                <div>
                                    <h4>Global Export</h4>
                                    <p>Instant access to buyers across 54 African nations and the diaspora.</p>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <TrendingUp size={24} />
                                <div>
                                    <h4>Neural Growth</h4>
                                    <p>AI-optimized pricing and conversion engines for your products.</p>
                                </div>
                            </div>
                        </div>
                        <Button className={styles.cta} variant="primary">Initialize Account</Button>
                    </HolographicCard>
                </div>
            </ModulePage>
        );
    }

    return (
        <ModulePage title="Dominator Dashboard" subtitle={`Welcome back, ${vendor.name}. Monitor your global trade nodes.`}>
            <div className={styles.dashboardGrid}>
                <HolographicCard title="Total Revenue" variant="neon">
                    <div className={styles.statValue}>
                        <DollarSign size={32} />
                        <span>${analytics?.totalRevenue.toLocaleString() || "0"}</span>
                    </div>
                    <p className={styles.statSubtitle}>+12% from last cycle</p>
                </HolographicCard>

                <HolographicCard title="Active Orders" variant="glass">
                    <div className={styles.statValue}>
                        <Package size={32} />
                        <span>{analytics?.totalOrders || "0"}</span>
                    </div>
                    <p className={styles.statSubtitle}>4 pending fulfillment</p>
                </HolographicCard>

                <HolographicCard title="Neural Reach" variant="glass">
                    <div className={styles.statValue}>
                        <TrendingUp size={32} />
                        <span>2.4k</span>
                    </div>
                    <p className={styles.statSubtitle}>Product impressions</p>
                </HolographicCard>
            </div>

            <div className={styles.actions}>
                <Link href="/sell/listings/new">
                    <Button variant="primary" leftIcon={<Plus size={18} />}>New Listing</Button>
                </Link>
                <Link href="/sell/listings">
                    <Button variant="glass">Manage Assets</Button>
                </Link>
            </div>

            <div className={styles.wideSection}>
                <HolographicCard title="Recent Transactions" variant="glass">
                    <div className={styles.table}>
                        {analytics?.recentOrders.length === 0 ? (
                            <p className={styles.empty}>No transaction traffic detected.</p>
                        ) : (
                            analytics?.recentOrders.map((order, i) => (
                                <div key={i} className={styles.row}>
                                    <span>{order.product.title}</span>
                                    <span>${order.price}</span>
                                    <span className={styles.status}>PAID</span>
                                </div>
                            ))
                        )}
                    </div>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}

