"use client";

import { useTheme, Theme } from "@/context/ThemeContext";
import { Moon, Droplets, Sunset } from "lucide-react";
import styles from "./ThemeSwitcher.module.css";

const themes: { id: Theme; icon: React.ElementType; label: string }[] = [
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "wine", icon: Droplets, label: "Wine" },
    { id: "slates", icon: Sunset, label: "Orange" }, // Using 'slates' as placeholder for orange if needed or rename
];

// Adjusting types to match what I'll put in globals.css
// The user asked for "Wine / Orange mode"
// I need to ensure ThemeContext supports these.
// ThemeContext currently has: "dark" | "light" | "cyber" | "corporate" | "emerald" | "sunset"
// I will map "wine" to a new key or use existing if I update Context.
// Let's assume I update Context to include "wine" and "orange".

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className={styles.switcher}>
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`${styles.btn} ${theme === t.id ? styles.active : ""}`}
                    title={t.label}
                >
                    <t.icon size={16} />
                </button>
            ))}
        </div>
    );
}
