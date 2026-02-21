"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import styles from "./settings.module.css";
import { Shield, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateUserProfile } from "@/server/actions/user";

export default function SettingsPage() {
    const { profile } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "",
                email: profile.email || "",
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!profile?.id) return;
        setSaving(true);
        try {
            await updateUserProfile(profile.id, {
                name: formData.name,
            });
            alert("Neural profile updated successfully.");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Profile synchronization failed.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className="neon-text">Command Vault</h1>
                    <p>Manage your neural identity and global credentials.</p>
                </header>

                <div className={styles.content}>
                    <div className={styles.mainColumn}>
                        <HolographicCard title="Identity Profile" subtitle="Global Node Information">
                            <div className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label>Display Name</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={styles.input}
                                            placeholder="e.g. Zack Awudu"
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Network Email</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            readOnly
                                            className={styles.input}
                                            style={{ opacity: 0.6 }}
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSave}
                                    className={styles.saveBtn}
                                    leftIcon={<Save size={20} />}
                                    disabled={saving}
                                >
                                    {saving ? "Synchronizing..." : "Update Neural Profile"}
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
                                        <p className={styles.statusDesc}>Your identity is encrypted across the node.</p>
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
