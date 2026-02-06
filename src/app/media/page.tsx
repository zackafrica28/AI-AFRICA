"use client";

import React, { useState } from "react";
import FluxNavbar from "@/components/ui/FluxNavbar";
import HolographicCard from "@/components/ui/HolographicCard";
import styles from "./media.module.css";

// Mock Trending News Data
const MOCK_NEWS = [
    { id: 1, title: "African Tech Giants Merge for Quantum Leap", category: "Economy", timestamp: "10 mins ago" },
    { id: 2, title: "Islamic Banking Assets Hit $4 Trillion Milestone", category: "Finance", timestamp: "32 mins ago" },
    { id: 3, title: "New Edu-Tech Satellites Launched Over Sahara", category: "Education", timestamp: "1 hour ago" },
    { id: 4, title: "Pan-African Trade Agreement Digitalized on Blockchain", category: "Economy", timestamp: "2 hours ago" },
];

export default function MediaCenter() {
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishStatus, setPublishStatus] = useState("IDLE");

    const handleAutoPublish = () => {
        setIsPublishing(true);
        setPublishStatus("SCANNING NEWS...");

        setTimeout(() => {
            setPublishStatus("GENERATING VIDEO SCRIPT...");
            setTimeout(() => {
                setPublishStatus("RENDERING AI AVATAR...");
                setTimeout(() => {
                    setPublishStatus("UPLOADING TO YOUTUBE: @AI-AFRICA");
                    setTimeout(() => {
                        setIsPublishing(false);
                        setPublishStatus("PUBLISHED SUCCESSFULLY ✅");
                        alert("Video successfully published to YouTube channel!");
                    }, 3000);
                }, 2000);
            }, 2000);
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <FluxNavbar />

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1 className="neon-text">Holo-Media Center</h1>
                    <p className={styles.subtitle}>The Voice of Africa • Automated Broadcasting Node</p>
                </header>

                <div className={styles.grid}>
                    {/* News Feed Agreggator */}
                    <section className={styles.newsSection}>
                        <h2 className={styles.sectionTitle}>Global Intelligence Feed</h2>
                        <div className={styles.newsList}>
                            {MOCK_NEWS.map((news) => (
                                <div key={news.id} className={styles.newsItem}>
                                    <span className={styles.category}>{news.category}</span>
                                    <h3 className={styles.newsTitle}>{news.title}</h3>
                                    <span className={styles.timestamp}>{news.timestamp}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Auto-Tube Controller */}
                    <section className={styles.controlSection}>
                        <HolographicCard className={styles.controlCard}>
                            <h2 className={styles.cardTitle}>Auto-Tube Publisher</h2>
                            <div className={styles.statusDisplay}>
                                <div className={`${styles.indicator} ${isPublishing ? styles.active : ""}`} />
                                <span className={styles.statusText}>{publishStatus}</span>
                            </div>

                            <button
                                className={styles.publishBtn}
                                onClick={handleAutoPublish}
                                disabled={isPublishing}
                            >
                                {isPublishing ? "PROCESSING..." : "INITIATE DAILY BROADCAST"}
                            </button>
                            <p className={styles.note}>Target Channel: <strong>AI-AFRICA</strong></p>
                        </HolographicCard>
                    </section>
                </div>
            </main>
        </div>
    );
}
