"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { UserPlus, Mail } from "lucide-react";
import styles from "./leads.module.css";

export default function CRMLeads() {
    const leads = [
        { id: 1, name: "Alpha Construction", contact: "John Doe", value: "$45k", origin: "Lagos Hub" },
        { id: 2, name: "Safari Tech", contact: "Jane Smith", value: "$82k", origin: "Nairobi Node" },
        { id: 3, name: "Sahara Energy", contact: "Ali Ahmed", value: "$120k", origin: "Cairo Base" },
    ];

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
