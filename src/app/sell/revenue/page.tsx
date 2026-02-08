"use client";
import ModulePage from "@/components/ui/ModulePage";
import StatCard from "@/components/ui/StatCard";
import HolographicCard from "@/components/ui/HolographicCard";
import { DollarSign, TrendingUp, CreditCard, Download } from "lucide-react";
import styles from "./revenue.module.css";
import Button from "@/components/ui/Button";

export default function SellRevenue() {
    return (
        <ModulePage title="Revenue Dashboard" subtitle="Real-time financial tracking for your commerce activities.">
            <div className={styles.stats}>
                <StatCard label="Total Earnings" value="$12,842" trend={{ value: 18, isUp: true }} icon={DollarSign} />
                <StatCard label="Available Balance" value="$4,250" icon={CreditCard} color="#7000ff" />
                <StatCard label="Processing" value="$1,200" icon={TrendingUp} color="#10b981" />
            </div>

            <div className={styles.grid}>
                <HolographicCard title="Earnings Forecast" variant="glass">
                    <div className={styles.placeholder}>
                        <p>Predictive AI anticipates a 22% growth in hardware sales next month.</p>
                    </div>
                </HolographicCard>

                <HolographicCard title="Payout History" interactive={false}>
                    <div className={styles.payouts}>
                        <div className={styles.payout}>
                            <span>Jan 28, 2026</span>
                            <span>$2,450.00</span>
                            <span className={styles.paid}>PAID</span>
                        </div>
                        <div className={styles.payout}>
                            <span>Feb 05, 2026</span>
                            <span>$1,800.00</span>
                            <span className={styles.pending}>PENDING</span>
                        </div>
                    </div>
                    <Button className={styles.payoutBtn} variant="glass" leftIcon={<Download size={18} />}>Export Statements</Button>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
