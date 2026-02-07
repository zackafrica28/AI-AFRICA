"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./landing.module.css";

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
      <div className={styles.content}>
        <h1 className={`${styles.title} neon-text`}>AI-AFRICA</h1>
        <p className={styles.subtitle}>EST. 2226 AD</p>

        <div className={styles.scanner} onClick={handleEnter}>
          <div className={`${styles.fingerprint} ${loading ? styles.scanning : ""}`}>
            {/* Visual simulation of a scanner */}
            <div className={styles.scanLine} />
          </div>
          <p className={styles.status}>{text}</p>
        </div>

        {!loading && (
          <button className={styles.enterBtn} onClick={handleEnter}>
            Touch to Enter System
          </button>
        )}
      </div>
    </div>
  );
}
