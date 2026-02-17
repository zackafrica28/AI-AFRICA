"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { Check, Zap, Shield, Crown } from "lucide-react";
import styles from "./pricing.module.css";

const TIERS = [
    {
        name: "Free",
        price: "$0",
        features: ["Basic Marketplace Access", "1 AI Agent Node", "Standard Security", "Community Support"],
        icon: Zap,
        color: "var(--text-muted)"
    },
    {
        name: "Pro",
        price: "$49",
        features: ["Full Marketplace Access", "10 AI Agent Nodes", "Advanced CRM Tools", "Quantum Encryption", "Priority Support"],
        icon: Shield,
        color: "var(--accent)",
        recommended: true
    },
    {
        name: "Enterprise",
        price: "$499",
        features: ["Unlimited Agent Nodes", "Custom Neural Training", "Dedicated Strategy Hub", "White-glove Deployment", "24/7 Human+AI Concierge"],
        icon: Crown,
        color: "#7000ff"
    }
];

export default function PricingPage() {
    return (
        <DashboardLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className="neon-text">Monetization Tiers</h1>
                    <p>Select your level of dominance in the Pan-African Digital Economy.</p>
                </header>

                <div className={styles.grid}>
                    {TIERS.map((tier) => (
                        <HolographicCard
                            key={tier.name}
                            variant={tier.recommended ? "neon" : "glass"}
                            className={`${styles.card} ${tier.recommended ? styles.recommended : ""}`}
                        >
                            <div className={styles.tierHeader}>
                                <tier.icon size={48} style={{ color: tier.color }} />
                                <h2 className={styles.tierName}>{tier.name}</h2>
                                <div className={styles.price}>
                                    <span className={styles.currency}>$</span>
                                    <span className={styles.amount}>{tier.price.replace('$', '')}</span>
                                    <span className={styles.period}>/mo</span>
                                </div>
                            </div>

                            <ul className={styles.features}>
                                {tier.features.map((f) => (
                                    <li key={f}><Check size={16} className={styles.check} /> <span>{f}</span></li>
                                ))}
                            </ul>

                            <Button
                                variant={tier.recommended ? "primary" : "glass"}
                                className={styles.cta}
                            >
                                {tier.name === "Free" ? "Current Plan" : `Upgrade to ${tier.name}`}
                            </Button>
                        </HolographicCard>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
