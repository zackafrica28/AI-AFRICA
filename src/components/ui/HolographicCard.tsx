"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./HolographicCard.module.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface HolographicCardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    onClick?: () => void;
    variant?: "glass" | "neon" | "solid";
    interactive?: boolean;
}

const HolographicCard: React.FC<HolographicCardProps> = ({
    children,
    title,
    subtitle,
    className = "",
    onClick,
    variant = "glass",
    interactive = true,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={interactive ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" } : {}}
            className={cn(styles.card, styles[variant], className)}
            onClick={onClick}
            role={onClick ? "button" : undefined}
        >
            <div className={styles.glow} />
            <div className={styles.borderEffect} />
            <div className={styles.content}>
                {title && (
                    <div className={styles.header}>
                        <h3 className={styles.title}>{title}</h3>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                )}
                <div className={styles.innerContent}>{children}</div>
            </div>
        </motion.div>
    );
};

export default HolographicCard;
