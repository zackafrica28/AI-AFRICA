"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import styles from "./media.module.css";
import { Play, Share2, Youtube, Radio, Activity } from "lucide-react";

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
                    }, 3000);
                }, 2000);
            }, 2000);
        }, 2000);
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className="neon-text">Holo-Media Center</h1>
                    <p>The Voice of Africa • Automated Broadcasting Node</p>
                </header>

                <div className={styles.layout}>
                    <section className={styles.newsColumn}>
                        <HolographicCard title="Global Intelligence Feed" subtitle="Live News Aggregator">
                            <div className={styles.newsList}>
                                {MOCK_NEWS.map((news) => (
                                    <div key={news.id} className={styles.newsItem}>
                                        <div className={styles.newsHeader}>
                                            <span className={styles.category}>{news.category}</span>
                                            <span className={styles.time}>{news.timestamp}</span>
                                        </div>
                                        <h3 className={styles.newsTitle}>{news.title}</h3>
                                        <div className={styles.newsActions}>
                                            <button><Play size={14} /> Listen</button>
                                            <button><Share2 size={14} /> Share</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </HolographicCard>
                    </section>

                    <section className={styles.controlColumn}>
                        <HolographicCard title="Auto-Tube Publisher" variant="neon" interactive={false}>
                            <div className={styles.publisherContent}>
                                <div className={styles.statusBox}>
                                    <div className={`${styles.indicator} ${isPublishing ? styles.active : ""}`} />
                                    <span className={styles.statusText}>{publishStatus}</span>
                                </div>

                                <div className={styles.previewContainer}>
                                    <div className={styles.monitor}>
                                        {isPublishing ? (
                                            <div className={styles.rendering}>
                                                <Activity className={styles.pulseIcon} />
                                                <p>NEURAL RENDERING IN PROGRESS</p>
                                            </div>
                                        ) : (
                                            <div className={styles.idle}>
                                                <Youtube size={48} className={styles.ytIcon} />
                                                <p>STANDBY FOR BROADCAST</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    className={styles.publishBtn}
                                    onClick={handleAutoPublish}
                                    isLoading={isPublishing}
                                    leftIcon={<Radio size={20} />}
                                >
                                    Initiate Daily Broadcast
                                </Button>
                                <p className={styles.channelLabel}>Target: <strong>AI-AFRICA Network</strong></p>
                            </div>
                        </HolographicCard>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
