"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./login.module.css";
import FluxNavbar from "@/components/ui/FluxNavbar";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const { login } = useAuth();

const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
    };

    return (
        <div className={styles.container}>
            <FluxNavbar />
            <div className={styles.content}>
                <h1 className="neon-text">Identity Verification</h1>
                <p className={styles.subtitle}>Enter credentials to access the Neural Grid.</p>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Neural ID (Email)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. zackawudu@ai-africa.com"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginBtn}>
                        INITIATE LINK
                    </button>
                </form>
            </div>
        </div>
    );
}
