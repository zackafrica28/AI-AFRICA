"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { CreditCard, History, Plus } from "lucide-react";
import styles from "./billing.module.css";

export default function BillingPage() {
    return (
        <ModulePage title="Neural Billing" subtitle="Manage your payment methods and transaction history.">
            <div className={styles.layout}>
                <div className={styles.main}>
                    <HolographicCard title="Payment Methods" variant="glass">
                        <div className={styles.cards}>
                            <div className={styles.cardItem}>
                                <CreditCard size={24} />
                                <div className={styles.cardDetails}>
                                    <p>•••• •••• •••• 4242</p>
                                    <span>Expires 12/28</span>
                                </div>
                                <span className={styles.badge}>DEFAULT</span>
                            </div>
                            <Button variant="outline" className={styles.addBtn} leftIcon={<Plus size={18} />}>Add New Card</Button>
                        </div>
                    </HolographicCard>

                    <HolographicCard title="Usage & Limits">
                        <div className={styles.usage}>
                            <div className={styles.metric}>
                                <span>AI Nodes Used</span>
                                <span>4 / 10</span>
                                <div className={styles.progress}><div className={styles.bar} style={{ width: '40%' }} /></div>
                            </div>
                            <div className={styles.metric}>
                                <span>Marketplace Listings</span>
                                <span>12 / 50</span>
                                <div className={styles.progress}><div className={styles.bar} style={{ width: '24%' }} /></div>
                            </div>
                        </div>
                    </HolographicCard>
                </div>

                <aside className={styles.sidebar}>
                    <HolographicCard title="Current Plan" variant="neon">
                        <h2 className={styles.planName}>PRO NODE</h2>
                        <p className={styles.planPrice}>$49.00 / mo</p>
                        <Button variant="glass" className={styles.fullWidth}>Manage Plan</Button>
                    </HolographicCard>
                </aside>
            </div>
        </ModulePage>
    );
}
