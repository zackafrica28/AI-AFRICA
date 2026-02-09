"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./landing.module.css";
import Button from "@/components/ui/Button";
import { ShieldCheck, Cpu, Globe } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("INITIALIZING NEURAL LINK...");

  const handleEnter = () => {
    setLoading(true);
    setText("AUTHENTICATING BIOMETRICS...");

    setTimeout(() => {
      setText("ACCESS GRANTED");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {/* Background Video or Animated Gradient */}
      <div className={styles.bgGlow} />

      <main className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.hero}
        >
          <div className={styles.tag}>EST. 2226 AD • Sector Africa</div>
          <h1 className={`${styles.title} neon-text`}>AI-AFRICA</h1>
          <p className={styles.subtitle}>
            The continent&apos;s premier autonomous business intelligence node.
            Dominate global trade with sentient AI agents.
          </p>
        </motion.div>

        <div className={styles.scannerWrapper}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${styles.scanner} ${loading ? styles.active : ""}`}
            onClick={handleEnter}
          >
            <div className={styles.scanLine} />
            <div className={styles.fingerprint}>
              <Cpu size={64} className={styles.cpuIcon} />
            </div>
          </motion.div>
          <p className={styles.statusText}>{text}</p>
        </div>

        {!loading && (
          <Button
            variant="glass"
            size="lg"
            className={styles.enterBtn}
            onClick={handleEnter}
          >
            Touch to Enter System
          </Button>
        )}

        <footer className={styles.footer}>
          <div className={styles.feature}>
            <ShieldCheck size={18} />
            <span>Quantum Secure</span>
          </div>
          <div className={styles.feature}>
            <Globe size={18} />
            <span>Pan-African Node</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
