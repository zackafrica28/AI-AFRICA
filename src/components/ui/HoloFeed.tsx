"use client";


import { useLiveFeed } from "@/context/LiveFeedContext";
import styles from "./HoloFeed.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Pause, Play, Zap } from "lucide-react";

const HoloFeed = () => {
    const { feed, isScanning, toggleScanning } = useLiveFeed();

    return (
        <div className={styles.feedContainer}>
            <div className={styles.header}>
                <div className={styles.status}>
                    <div className={`${styles.indicator} ${isScanning ? styles.active : ""}`} />
                    <span className={styles.statusText}>
                        {isScanning ? "NEURAL SCANNING ACTIVE" : "SCAN PAUSED"}
                    </span>
                </div>
                <button onClick={toggleScanning} className={styles.toggleBtn}>
                    {isScanning ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isScanning ? "PAUSE" : "RESUME"}</span>
                </button>
            </div>

            <div className={styles.scrollContainer}>
                <div className={styles.track}>
                    <AnimatePresence mode="popLayout">
                        {feed.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={styles.item}
                            >
                                <div className={styles.categoryBadge}>
                                    <Zap size={10} />
                                    <span>{item.category}</span>
                                </div>
                                <div className={styles.itemContent}>
                                    <span className={styles.source}>Via {item.source}:</span>
                                    <span className={styles.title}>{item.title}</span>
                                    <span className={styles.price}>{item.price}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {feed.length === 0 && (
                        <div className={styles.loadingItem}>
                            <Radio className={styles.spin} />
                            <span>Initializing Neural Link...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HoloFeed;
