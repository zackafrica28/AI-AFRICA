"use client";

import React from "react";
import styles from "./HolographicCard.module.css";

interface HolographicCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    onClick?: () => void;
}

const HolographicCard: React.FC<HolographicCardProps> = ({
    children,
    title,
    className = "",
    onClick,
}) => {
    return (
        <div
            className={`${styles.card} ${className}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
        >
            <div className={styles.glow} />
            <div className={styles.border} />
            <div className={styles.content}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {children}
            </div>
        </div>
    );
};

export default HolographicCard;
