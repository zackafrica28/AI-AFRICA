"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import styles from "./pipeline.module.css";
import { useAuth } from "@/context/AuthContext";
import { DollarSign, ArrowRight } from "lucide-react";

const stages = ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "CLOSED"];

export default function CRMPipeline() {
    const { profile } = useAuth();
    const [deals, setDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.id) {
            fetch(`/api/crm?userId=${profile.id}`)
                .then(res => res.json())
                .then(data => {
                    setDeals(data.deals || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [profile?.id]);

    if (loading) return (
        <ModulePage title="Sales Pipeline" subtitle="Syncing revenue nodes...">
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="neon-spinner"></div>
            </div>
        </ModulePage>
    );

    return (
        <ModulePage title="Sales Pipeline" subtitle="Visualizing your revenue funnel across the continent.">
            <div className={styles.pipeline}>
                {stages.map((stage) => {
                    const stageDeals = deals.filter(d => (d.status || "PROSPECTING").toUpperCase() === stage);
                    const totalValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0);

                    return (
                        <div key={stage} className={styles.stage}>
                            <div className={styles.stageHeader}>
                                <h4 className={styles.stageTitle}>{stage}</h4>
                                <span className={styles.stageCount}>{stageDeals.length}</span>
                            </div>
                            <div className={styles.stageTotal}>
                                ${totalValue.toLocaleString()}
                            </div>
                            <div className={styles.dropZone}>
                                {stageDeals.length === 0 ? (
                                    <div className={styles.emptyZone}>No active nodes</div>
                                ) : (
                                    stageDeals.map((deal) => (
                                        <div key={deal.id} className={styles.card}>
                                            <div className={styles.cardInfo}>
                                                <p className={styles.dealName}>{deal.name}</p>
                                                <div className={styles.dealMeta}>
                                                    <DollarSign size={12} className="text-accent" />
                                                    <span>{deal.value?.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <button className={styles.moveBtn}>
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </ModulePage>
    );
}
