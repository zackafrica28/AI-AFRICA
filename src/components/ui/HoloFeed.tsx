"use client";

import React from "react";
import { useLiveFeed } from "@/context/LiveFeedContext";
import styles from "./HoloFeed.module.css";

const HoloFeed = () => {
    const { feed, isScanning, toggleScanning } = useLiveFeed();

    return (
        <div className={styles.feedContainer}>
            <div className={styles.header}>
                <div className={styles.status}>
                    <span className={`${styles.indicator} ${isScanning ? styles.active : ""}`} />
                    {isScanning ? "NEURAL SCANNING ACTIVE" : "SCAN PAUSED"}
                </div>
                <button onClick={toggleScanning} className={styles.toggleBtn}>
                    {isScanning ? "PAUSE" : "RESUME"}
                </button>
            </div>

            <div className={styles.scrollContainer}>
                <div className={styles.track}>
                    {feed.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <span className={styles.category}>[{item.category}]</span>
                            <span className={styles.source}>Via {item.source}:</span>
                            <span className={styles.title}>{item.title}</span>
                            <span className={styles.price}>{item.price}</span>
                        </div>
                    ))}
                    {feed.length === 0 && <div className={styles.item}>Initializing Neural Link...</div>}
                </div>
            </div>
        </div>
    );
};

export default HoloFeed;
