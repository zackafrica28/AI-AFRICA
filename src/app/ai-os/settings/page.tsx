"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { Shield, Globe } from "lucide-react";
import styles from "./settings.module.css";

export default function AIOSSettings() {
    return (
        <ModulePage title="System Environment" subtitle="Global configuration for autonomous nodes and API clusters.">
            <div className={styles.grid}>
                <HolographicCard title="API Infrastructure" variant="glass">
                    <div className={styles.field}>
                        <label>Neural Link API Key</label>
                        <div className={styles.inputBox}>
                            <input type="password" value="sk-neural-42-zack-africa" readOnly />
                            <Button size="sm" variant="glass">Rotate</Button>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Webhook URL</label>
                        <div className={styles.inputBox}>
                            <input type="text" value="https://api.ai-africa.com/v1/webhooks" readOnly />
                        </div>
                    </div>
                </HolographicCard>

                <HolographicCard title="Security Protocols" variant="neon">
                    <div className={styles.toggleItem}>
                        <div className={styles.info}>
                            <Shield size={20} />
                            <span>Quantum-Resistant Tunneling</span>
                        </div>
                        <div className={styles.switch}><div className={styles.knob} /></div>
                    </div>
                    <div className={styles.toggleItem}>
                        <div className={styles.info}>
                            <Globe size={20} />
                            <span>Edge Deployment (Multi-Region)</span>
                        </div>
                        <div className={styles.switch} data-active="true"><div className={styles.knob} /></div>
                    </div>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
