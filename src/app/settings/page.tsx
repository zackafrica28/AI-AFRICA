"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import styles from "./settings.module.css";
import { Shield, Key, Eye, EyeOff, Save } from "lucide-react";

export default function SettingsPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        youtubeEmail: "zackawudumk@gmail.com",
        youtubePassword: "••••••••••••••",
        youtubeChannelId: "UC_AI_AFRICA_NODE_01",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        alert("Credentials securely encrypted and saved to the Neural Vault.");
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className="neon-text">Command Vault</h1>
                    <p>Manage sensitive credentials for AI Autonomous Agents.</p>
                </header>

                <div className={styles.content}>
                    <div className={styles.mainColumn}>
                        <HolographicCard title="YouTube Automation Credentials" subtitle="Encrypted API Access">
                            <div className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label>Channel Email</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="email"
                                            name="youtubeEmail"
                                            value={formData.youtubeEmail}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Channel Access Key</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="youtubePassword"
                                            value={formData.youtubePassword}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                        <button
                                            className={styles.toggleVisibility}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Service ID</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="text"
                                            name="youtubeChannelId"
                                            value={formData.youtubeChannelId}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSave}
                                    className={styles.saveBtn}
                                    leftIcon={<Save size={20} />}
                                >
                                    Encrypt & Save to Vault
                                </Button>
                            </div>
                        </HolographicCard>
                    </div>

                    <div className={styles.sideColumn}>
                        <HolographicCard title="Appearance" variant="solid">
                            <ThemeSwitcher />
                        </HolographicCard>

                        <HolographicCard title="Security Status" variant="neon">
                            <div className={styles.securityStatus}>
                                <div className={styles.securityItem}>
                                    <Shield size={24} className={styles.shieldIcon} />
                                    <div>
                                        <p className={styles.statusTitle}>AES-512 Enforced</p>
                                        <p className={styles.statusDesc}>Your data is invisible to the cloud.</p>
                                    </div>
                                </div>
                            </div>
                        </HolographicCard>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
