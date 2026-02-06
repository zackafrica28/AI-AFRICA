"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./FluxNavbar.module.css";
import { useRouter } from "next/navigation";

const FluxNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const router = useRouter();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer} onClick={() => router.push("/")}>
                <div className={styles.logoGlitch} data-text="AI-AFRICA">AI-AFRICA</div>
                <div className={styles.subLogo}>2226 AD</div>
            </div>

            <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
                {!user && <Link href="/login" className={styles.link}>Neural Login</Link>}

                {user && (
                    <>
                        <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                        <Link href="/buy" className={styles.link}>Buy</Link>

                        {(user.subscriptionTier || isAdmin) ? (
                            <Link href="/sell" className={styles.link}>Sell</Link>
                        ) : (
                            <Link href="/subscribe" className={styles.link}>Unlock Sell</Link>
                        )}

                        <Link href="/ai-os" className={styles.link}>AI OS</Link>

                        {isAdmin && <Link href="/ceo" className={`${styles.link} ${styles.ceoLink}`}>CEO Office</Link>}

                        <Link href="/download" className={styles.link}>Download App</Link>

                        <button onClick={logout} className={styles.logoutBtn}>Disconnect</button>
                    </>
                )}
            </div>

            <button
                className={styles.menuButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                <div className={styles.hamburger} />
            </button>
        </nav>
    );
};

export default FluxNavbar;
