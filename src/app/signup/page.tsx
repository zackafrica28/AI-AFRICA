"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Direct import for creation
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../login/login.module.css"; // Reuse login styles
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Cpu } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPass) {
            setError("Passcodes do not match");
            return;
        }

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create Profile
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: "GUEST",
                subscriptionTier: "NONE",
                createdAt: new Date().toISOString(),
                activeModules: ["ai-os"]
            });

            // Redirect to onboarding or dashboard
            router.push("/dashboard");
        } catch (err: unknown) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError("Registration Failed: " + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.orb} style={{ background: "radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)" }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.loginCard}
            >
                <div className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <Cpu size={48} className={styles.logoIcon} style={{ color: "var(--accent-secondary)" }} />
                    </div>
                    <h1 className="neon-text" style={{ textShadow: "0 0 10px var(--accent-secondary)" }}>New Node Protocol</h1>
                    <p>Join the AI-AFRICA Network</p>
                </div>

                <form onSubmit={handleSignup} className={styles.form}>
                    <Input
                        label="Neural ID (Email)"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="new.user@ai-africa.com"
                        required
                    />

                    <Input
                        label="Create Passcode"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />

                    <Input
                        label="Verify Passcode"
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
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
                        style={{ background: "var(--accent-secondary)", borderColor: "var(--accent-secondary)" }}
                    >
                        Activate Credentials
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p className="text-sm text-gray-500 mb-4">
                        Already linked? <Link href="/login" className="text-accent hover:underline">Access Terminal</Link>
                    </p>
                    <div className={styles.securityBar} style={{ background: "var(--accent-secondary)" }} />
                    <span className="text-[10px] text-gray-600 mt-2">Biometric Encryption Active</span>
                </div>
            </motion.div>
        </div>
    );
}
