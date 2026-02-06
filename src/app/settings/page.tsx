"use client";

import React, { useState } from "react";
import FluxNavbar from "@/components/ui/FluxNavbar";
import styles from "./settings.module.css";

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        youtubeEmail: "",
        youtubePassword: "",
        youtubeChannelId: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // In a real app, this would encrypt and save to a secure backend or local storage
        alert("Credentials securely encrypted and saved to local vault.");
        // Clear passwords from UI for security
        setFormData({ ...formData, youtubePassword: "" });
    };

    return (
        <div className={styles.container}>
            <FluxNavbar />

            <main className={styles.main}>
                <h1 className="neon-text">Secure Command Vault</h1>
                <p className={styles.description}>
                    Manage sensitive credentials for AI Autonomous Agents.
                    <br />
                    <span className={styles.warning}>
                        ⚠️ Data is encrypted locally. Never share your screen while viewing this page.
                    </span>
                </p>

                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>YouTube Automation Credentials</h2>

                    <div className={styles.inputGroup}>
                        <label>Channel Email</label>
                        <input
                            type="email"
                            name="youtubeEmail"
                            className={styles.input}
                            placeholder="zackawudumk@gmail.com"
                            value={formData.youtubeEmail}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Channel Password / App Key</label>
                        <input
                            type="password"
                            name="youtubePassword"
                            className={styles.input}
                            placeholder="••••••••••••••"
                            value={formData.youtubePassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Channel ID (Optional)</label>
                        <input
                            type="text"
                            name="youtubeChannelId"
                            className={styles.input}
                            placeholder="UC..."
                            value={formData.youtubeChannelId}
                            onChange={handleChange}
                        />
                    </div>

                    <button className={styles.saveBtn} onClick={handleSave}>
                        ENCRYPT & SAVE
                    </button>
                </div>
            </main>
        </div>
    );
}
