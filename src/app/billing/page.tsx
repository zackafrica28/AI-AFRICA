"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { FileText } from "lucide-react";
import styles from "./billing.module.css";
import { useAuth } from "@/context/AuthContext";

export default function BillingPage() {
    const { profile } = useAuth();
    const [billingData, setBillingData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.id) {
            fetch(`/api/billing?userId=${profile.id}`)
                .then(res => res.json())
                .then(data => {
                    setBillingData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Billing fetch error:", err);
                    setLoading(false);
                });
        }
    }, [profile?.id]);

    if (loading) return (
        <ModulePage title="Neural Billing" subtitle="Syncing payment nodes...">
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="neon-spinner"></div>
            </div>
        </ModulePage>
    );

    const activeSub = billingData?.subscriptions?.find((s: any) => s.active);

    return (
        <ModulePage title="Neural Billing" subtitle="Manage your payment methods and transaction history.">
            <div className={styles.layout}>
                <div className={styles.main}>
                    <HolographicCard title="Payment History" variant="glass">
                        <div className={styles.transactions}>
                            {billingData?.payments?.length === 0 ? (
                                <p className="text-muted text-center py-4">No recent payments found.</p>
                            ) : (
                                billingData?.payments?.map((payment: any) => (
                                    <div key={payment.id} className={styles.paymentItem}>
                                        <div className={styles.paymentInfo}>
                                            <p className="font-bold">{payment.order?.product?.title || "Market Item"}</p>
                                            <span className="text-xs text-muted">{new Date(payment.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="neon-text">${payment.amount}</p>
                                            <span className="text-[10px] uppercase opacity-50">{payment.provider}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </HolographicCard>

                    <HolographicCard title="System Utilization">
                        <div className={styles.usage}>
                            <div className={styles.metric}>
                                <span>Subscription Nodes</span>
                                <span>{activeSub ? "1 / 1" : "0 / 1"}</span>
                                <div className={styles.progress}><div className={styles.bar} style={{ width: activeSub ? '100%' : '0%' }} /></div>
                            </div>
                            <div className={styles.metric}>
                                <span>Regional Compliance</span>
                                <span>SECURE</span>
                                <div className={styles.progress}><div className={styles.bar} style={{ width: '100%' }} /></div>
                            </div>
                        </div>
                    </HolographicCard>
                </div>

                <aside className={styles.sidebar}>
                    <HolographicCard title="Current Plan" variant="neon">
                        <h2 className={styles.planName}>{activeSub ? activeSub.plan.toUpperCase() : "FREE TIER"}</h2>
                        <p className={styles.planPrice}>{activeSub ? "ACTIVE NODE" : "Limited Access"}</p>
                        <Button variant="glass" className={styles.fullWidth}>
                            {activeSub ? "Manage Node" : "Upgrade to Pro"}
                        </Button>
                    </HolographicCard>

                    <HolographicCard title="Invoices" variant="glass" className="mt-4">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm opacity-70">
                                <div className="flex items-center gap-2"><FileText size={14} /> <span>Feb 2026</span></div>
                                <span className="cursor-pointer hover:text-accent">PDF</span>
                            </div>
                            <div className="flex justify-between items-center text-sm opacity-70">
                                <div className="flex items-center gap-2"><FileText size={14} /> <span>Jan 2026</span></div>
                                <span className="cursor-pointer hover:text-accent">PDF</span>
                            </div>
                        </div>
                    </HolographicCard>
                </aside>
            </div>
        </ModulePage>
    );
}
