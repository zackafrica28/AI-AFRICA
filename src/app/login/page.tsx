"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import styles from "./login.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { Fingerprint } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login(email, password);
            // Login successful - AuthContext handles redirect
        } catch (err: unknown) {
            console.error(err);
            setError("Authentication Failed: Invalid Credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
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
                    <Input
                        label="Neural ID (Email)"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="zackawudu@ai-africa.com"
                        required
                    />

                    <Input
                        label="Passcode"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

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
                    <p className="text-sm text-gray-500 mb-4">
                        New Node? <Link href="/signup" className="text-accent hover:underline">Establish Connection</Link>
                    </p>
                    <div className={styles.securityBar} />
                    <span className="text-[10px] text-gray-600 mt-2">Secure AES-512 Encrypted Link</span>
                </div>
            </motion.div>
        </div>
    );
}
