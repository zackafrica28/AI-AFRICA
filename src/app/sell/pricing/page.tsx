"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { DollarSign, Tag, TrendingDown, Target } from "lucide-react";
import styles from "./pricing.module.css";

export default function SellPricing() {
    return (
        <ModulePage title="Dynamic Pricing AI" subtitle="Predictive market analysis and automated price optimization.">
            <div className={styles.grid}>
                <HolographicCard title="Live Market Index" variant="neon">
                    <div className={styles.indexItem}>
                        <span>Hardware Demand</span>
                        <span className={styles.up}>+14.2%</span>
                    </div>
                    <div className={styles.indexItem}>
                        <span>Software Licensing</span>
                        <span className={styles.down}>-2.4%</span>
                    </div>
                </HolographicCard>

                <HolographicCard title="Price Strategy">
                    <div className={styles.strategySelect}>
                        <label>Current Strategy: <strong>Profit Maximization</strong></label>
                        <div className={styles.actions}>
                            <Button size="sm" variant="glass">Adjust</Button>
                            <Button size="sm" variant="primary">Apply AI Advice</Button>
                        </div>
                    </div>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
