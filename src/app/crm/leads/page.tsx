"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { UserPlus, Mail } from "lucide-react";
import styles from "./leads.module.css";
import { useAuth } from "@/context/AuthContext";
import { getLeads } from "@/server/actions/crm";

export default function CRMLeads() {
    const { user } = useAuth();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            getLeads(user.uid).then(data => {
                setLeads(data);
                setLoading(false);
            });
        }
    }, [user?.uid]);

    if (loading) return <ModulePage title="Scanning Nodes..." subtitle="Fetching lead intelligence."><div className="neon-spinner"></div></ModulePage>;

    return (
        <ModulePage title="Leads Management" subtitle="Track and nurture potential business opportunities across Africa.">
            <div className={styles.header}>
                <Button leftIcon={<UserPlus size={18} />}>Capture New Lead</Button>
            </div>
            <div className={styles.grid}>
                {leads.map((lead) => (
                    <HolographicCard key={lead.id} title={lead.name} subtitle={lead.origin}>
                        <div className={styles.leadInfo}>
                            <div className={styles.row}><Mail size={14} /> <span>Contact: {lead.contact}</span></div>
                            <div className={styles.row}><span className={styles.valueLabel}>Potential Value:</span> <span className={styles.value}>{lead.value}</span></div>
                        </div>
                        <div className={styles.actions}>
                            <Button size="sm" variant="glass">Details</Button>
                            <Button size="sm" variant="primary">Nurture</Button>
                        </div>
                    </HolographicCard>
                ))}
            </div>
        </ModulePage>
    );
}
