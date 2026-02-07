"use client";

import React from "react";
import { useTheme, Theme } from "@/context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";
import { motion } from "framer-motion";

const themes: { name: Theme; label: string; color: string }[] = [
    { name: "dark", label: "Deep Space", color: "#050510" },
    { name: "light", label: "Pure Light", color: "#f8fafc" },
    { name: "cyber", label: "Neon Cyber", color: "#0d0221" },
    { name: "corporate", label: "Corporate", color: "#1e293b" },
    { name: "emerald", label: "Emerald", color: "#061f1c" },
    { name: "sunset", label: "Sunset", color: "#1a100d" },
];

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className={styles.container}>
            <h4 className={styles.label}>Select Grid Theme</h4>
            <div className={styles.grid}>
                {themes.map((t) => (
                    <motion.button
                        key={t.name}
                        className={`${styles.swatch} ${theme === t.name ? styles.active : ""}`}
                        onClick={() => setTheme(t.name)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={t.label}
                    >
                        <div className={styles.preview} style={{ backgroundColor: t.color }} />
                        <span className={styles.swatchLabel}>{t.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
