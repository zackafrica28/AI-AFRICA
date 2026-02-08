"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { Play, Settings2, Trash2 } from "lucide-react";
import styles from "./automations.module.css";

export default function AIOSAutomations() {
    const scripts = [
        { id: 1, name: "Web Scraper v4", status: "Running", uptime: "14d 2h" },
        { id: 2, name: "Neural Price Engine", status: "Idle", uptime: "0d 0h" },
        { id: 3, name: "Market Arbiter", status: "Running", uptime: "4h 12m" },
    ];

    return (
        <ModulePage title="Automations" subtitle="Manage autonomous background workers and neural scripts.">
            <div className={styles.grid}>
                {scripts.map((script) => (
                    <HolographicCard key={script.id} title={script.name} variant="glass">
                        <div className={styles.scriptStats}>
                            <div className={styles.stat}>
                                <span>Status</span>
                                <span className={script.status === "Running" ? styles.running : ""}>{script.status}</span>
                            </div>
                            <div className={styles.stat}>
                                <span>Uptime</span>
                                <span>{script.uptime}</span>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <Button size="sm" variant="glass" leftIcon={<Settings2 size={14} />}>Config</Button>
                            <Button size="sm" variant="primary" leftIcon={<Play size={14} />}>Restart</Button>
                        </div>
                    </HolographicCard>
                ))}
            </div>
        </ModulePage>
    );
}
