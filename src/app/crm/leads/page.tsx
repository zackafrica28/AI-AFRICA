"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { UserPlus, Mail } from "lucide-react";
import Link from "next/link";
import styles from "./leads.module.css";
import { useAuth } from "@/context/AuthContext";
import { getLeads } from "@/server/actions/crm";

export default function CRMLeads() {
    const { profile } = useAuth();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCapture, setShowCapture] = useState(false);

    useEffect(() => {
        if (profile?.id) {
            getLeads(profile.id).then(data => {
                setLeads(data);
                setLoading(false);
            });
        }
    }, [profile?.id]);

    if (loading) return <ModulePage title="Scanning Nodes..." subtitle="Fetching lead intelligence."><div className="neon-spinner"></div></ModulePage>;

    return (
        <ModulePage title="Leads Management" subtitle="Track and nurture potential business opportunities across Africa.">
            <div className={styles.header}>
                <Button onClick={() => setShowCapture(true)} leftIcon={<UserPlus size={18} />}>Capture New Lead</Button>
            </div>

            <div className={styles.grid}>
                {leads.length === 0 ? (
                    <div className="col-span-full text-center py-20 opacity-50 font-heading tracking-widest uppercase">
                        Zero Neural Leads Captured
                    </div>
                ) : (
                    leads.map((lead) => (
                        <HolographicCard key={lead.id} title={lead.name} subtitle={lead.status}>
                            <div className={styles.leadInfo}>
                                <div className={styles.row}>
                                    <Mail size={14} className="text-accent" />
                                    <span className="text-xs truncate">{lead.email || "No Email"}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.valueLabel}>Acquisition Value:</span>
                                    <span className={styles.value}>${lead.value?.toLocaleString() || "0.00"}</span>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <Button size="sm" variant="glass" className="flex-1">Details</Button>
                                <Link href="/crm/pipeline" className="flex-1">
                                    <Button size="sm" variant="primary" className="w-full">Nurture</Button>
                                </Link>
                            </div>
                        </HolographicCard>
                    ))
                )}
            </div>

            {showCapture && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
                    <HolographicCard title="Capture New Neural Lead" variant="neon" className="max-w-md w-full">
                        <div className="space-y-4 pt-4">
                            <input placeholder="Lead Name" className="w-full bg-white/5 border border-white/10 p-3 rounded text-sm" />
                            <input placeholder="Digital Identity (Email)" className="w-full bg-white/5 border border-white/10 p-3 rounded text-sm" />
                            <input placeholder="Projected Value ($)" className="w-full bg-white/5 border border-white/10 p-3 rounded text-sm" />
                            <div className="flex gap-4 mt-6">
                                <Button onClick={() => setShowCapture(false)} variant="glass">Abort</Button>
                                <Button onClick={() => setShowCapture(false)} variant="primary" className="flex-1">Sync Lead</Button>
                            </div>
                        </div>
                    </HolographicCard>
                </div>
            )}
        </ModulePage>
    );
}
