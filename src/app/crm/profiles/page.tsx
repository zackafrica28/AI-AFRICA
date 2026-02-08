"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { User, Mail, Globe, Briefcase, Bookmark } from "lucide-react";
import styles from "./profiles.module.css";

export default function CRMProfiles() {
    const clients = [
        { id: 1, name: "Zack Awudu", email: "zack@ai-africa.com", role: "CEO", company: "AI-AFRICA" },
        { id: 2, name: "Musa Keita", email: "mkeita@safari.com", role: "Founder", company: "Safari Tech" },
    ];

    return (
        <ModulePage title="Customer Profiles" subtitle="Secure repository of high-value business identities and relationships.">
            <div className={styles.grid}>
                {clients.map((client) => (
                    <HolographicCard key={client.id} title={client.name} variant="glass">
                        <div className={styles.info}>
                            <div className={styles.row}><Mail size={16} /> <span>{client.email}</span></div>
                            <div className={styles.row}><Briefcase size={16} /> <span>{client.role} @ {client.company}</span></div>
                        </div>
                        <div className={styles.actions}>
                            <Button size="sm" variant="glass" leftIcon={<Bookmark size={14} />}>Save</Button>
                            <Button size="sm" variant="primary">View Profile</Button>
                        </div>
                    </HolographicCard>
                ))}
            </div>
        </ModulePage>
    );
}
