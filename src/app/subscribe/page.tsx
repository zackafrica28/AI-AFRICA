"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./subscribe.module.css";
import FluxNavbar from "@/components/ui/FluxNavbar";
import HolographicCard from "@/components/ui/HolographicCard";

export default function SubscribePage() {
    const { subscribe } = useAuth();

    return (
        <div className={styles.container}>
            <FluxNavbar />

            <header className={styles.header}>
                <h1 className="neon-text">Access Required</h1>
                <p>Choose your Clearance Level to operate on the Neural Grid.</p>
            </header>

            <div className={styles.grid}>
                <HolographicCard title="Standard Merchant" className={styles.card}>
                    <div className={styles.price}>$800<span className={styles.period}>/mo</span></div>
                    <ul className={styles.features}>
                        <li>Access to Sell Marketplace</li>
                        <li>Basic Analytics</li>
                        <li>50 Product Listings</li>
                        <li>Standard Support</li>
                    </ul>
                    <button onClick={() => subscribe("GOLD")} className={styles.btn}>
                        ACTIVATE STANDARD
                    </button>
                </HolographicCard>

                <HolographicCard title="Titanium Enterprise" className={`${styles.card} ${styles.premium}`}>
                    <div className={styles.price}>$4,000<span className={styles.period}>/mo</span></div>
                    <ul className={styles.features}>
                        <li>Full "Industries Hall" Access</li>
                        <li>Top-Tier Algorithm Ranking</li>
                        <li>Unlimited Global Listings</li>
                        <li>Zero-Fee Transactions</li>
                        <li>Direct Investor Links</li>
                    </ul>
                    <button onClick={() => subscribe("TITANIUM")} className={styles.btnPremium}>
                        ACTIVATE TITANIUM
                    </button>
                </HolographicCard>
            </div>
        </div>
    );
}
