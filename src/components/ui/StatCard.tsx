"use client";

import React from "react";

import styles from "./StatCard.module.css";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    trend?: {
        value: number;
        isUp: boolean;
    };
    icon: LucideIcon;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon: Icon, color = "var(--accent)" }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${color}20`, color }}>
                    <Icon size={20} />
                </div>
                {trend && (
                    <div className={`${styles.trend} ${trend.isUp ? styles.up : styles.down}`}>
                        {trend.isUp ? "+" : "-"}{trend.value}%
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.value}>{value}</h3>
                <p className={styles.label}>{label}</p>
            </div>
            <div className={styles.glow} style={{ backgroundColor: color }} />
        </div>
    );
};

export default StatCard;
