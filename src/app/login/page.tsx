"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import styles from "./login.module.css";
import Button from "@/components/ui/Button";
import { Fingerprint, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mimic biometric scan
        await new Promise((resolve) => setTimeout(resolve, 2000));
        login(email);
    };

    return (
        <div className={styles.page}>
            {/* Background Decor */}
            <div className={styles.orb} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.loginCard}
            >
                <div className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <Fingerprint size={48} className={styles.logoIcon} />
                    </div>
                    <h1 className="neon-text">System Identity</h1>
                    <p>Initialize your link to the Neural Grid</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={email ? styles.floating : ""}>Access Key (Email)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={email ? "" : "zackawudu@ai-africa.com"}
                            required
                            className={styles.input}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className={styles.submitBtn}
                        isLoading={isLoading}
                    >
                        Initiate Neural Link
                    </Button>
                </form>

                <div className={styles.footer}>
                    <span>Secure AES-512 Encrypted Link</span>
                    <div className={styles.securityBar} />
                </div>
            </motion.div>
        </div>
    );
}
