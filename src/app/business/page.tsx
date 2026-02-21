"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import {
    Smartphone,
    Store,
    TrendingUp,
    Plus,
    Settings
} from "lucide-react";
import styles from "./business.module.css";
import { useAuth } from "@/context/AuthContext";
import { createBusiness } from "@/server/actions/business";

export default function BusinessHub() {
    const { profile, user } = useAuth();
    const [step, setStep] = useState(profile?.role === "VENDOR" ? "dashboard" : "onboarding");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        industry: "Retail",
        momoNumber: "",
        momoNetwork: "MTN",
    });

    const handleOnboarding = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.uid) return;
        setLoading(true);
        const res = await createBusiness(user.uid, formData);
        if (res.success) {
            setStep("dashboard");
        } else {
            alert("Verification failed: " + res.error);
        }
        setLoading(false);
    };

    if (step === "onboarding") {
        return (
            <DashboardLayout>
                <div className={styles.onboardingContainer}>
                    <HolographicCard title="Activate Business OS" subtitle="Initialize your regional trade node">
                        <form onSubmit={handleOnboarding} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label>Business Name</label>
                                <input
                                    required
                                    className={styles.input}
                                    placeholder="e.g. Lagos Tech Sourcing"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Industry</label>
                                <select
                                    className={styles.input}
                                    value={formData.industry}
                                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                >
                                    <option>Retail</option>
                                    <option>Tech</option>
                                    <option>logistics</option>
                                    <option>Agriculture</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Mobile Money Number (For Payouts)</label>
                                <div className={styles.momoInput}>
                                    <select
                                        className={styles.networkSelect}
                                        value={formData.momoNetwork}
                                        onChange={e => setFormData({ ...formData, momoNetwork: e.target.value })}
                                    >
                                        <option>MTN</option>
                                        <option>AIRTEL</option>
                                        <option>ORANGE</option>
                                    </select>
                                    <input
                                        required
                                        className={styles.input}
                                        placeholder="024 XXX XXXX"
                                        value={formData.momoNumber}
                                        onChange={e => setFormData({ ...formData, momoNumber: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button type="submit" disabled={loading} className={styles.submitBtn}>
                                {loading ? "Syncing Identity..." : "Launch Asset"}
                            </Button>
                        </form>
                    </HolographicCard>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className={styles.hubContainer}>
                <header className={styles.header}>
                    <h1 className="neon-text">Business Hub</h1>
                    <p>Financial Node: 0xAFR-{user?.uid?.substring(0, 5).toUpperCase()}</p>
                </header>

                <div className={styles.grid}>
                    <div className={styles.metrics}>
                        <StatCard
                            label="Available Balance"
                            value="$1,240.00"
                            icon={TrendingUp}
                        />
                        <StatCard
                            label="Pending MoMo"
                            value="$320.00"
                            icon={Smartphone}
                            color="#ff8c00"
                        />
                    </div>

                    <div className={styles.actions}>
                        <HolographicCard title="Quick Controls">
                            <div className={styles.actionGrid}>
                                <button className={styles.actionItem}>
                                    <Plus />
                                    <span>New Listing</span>
                                </button>
                                <button className={styles.actionItem}>
                                    <Smartphone />
                                    <span>Withdraw</span>
                                </button>
                                <button className={styles.actionItem}>
                                    <Settings />
                                    <span>Store Config</span>
                                </button>
                            </div>
                        </HolographicCard>
                    </div>

                    <div className={styles.fullWidth}>
                        <HolographicCard title="Active Inventory" subtitle="Manage your trade assets">
                            <div className={styles.emptyState}>
                                <Store size={48} className={styles.emptyIcon} />
                                <p>Your trade network is empty. List your first product to begin.</p>
                                <Button variant="primary">Initialize Sourcing</Button>
                            </div>
                        </HolographicCard>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ label, value, icon: Icon, color = "var(--accent)" }: any) {
    return (
        <div className={styles.statCard} style={{ borderLeftColor: color }}>
            <div className={styles.statInfo}>
                <p>{label}</p>
                <h3>{value}</h3>
            </div>
            <Icon size={24} style={{ color }} />
        </div>
    );
}
