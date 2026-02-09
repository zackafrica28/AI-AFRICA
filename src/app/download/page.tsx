"use client";
import styles from "./download.module.css";
import FluxNavbar from "@/components/ui/FluxNavbar";
import HolographicCard from "@/components/ui/HolographicCard";

export default function DownloadPage() {
    return (
        <div className={styles.container}>
            <FluxNavbar />

            <header className={styles.header}>
                <h1 className="neon-text">Universal Access</h1>
                <p>Install the Neural Grid on any device. Sync instantly.</p>
            </header>

            <div className={styles.grid}>
                {/* iOS Section */}
                <HolographicCard title="Apple iOS" className={styles.card}>
                    <div className={styles.icon}>🍎</div>
                    <h3>iPhone & iPad</h3>
                    <ul className={styles.features}>
                        <li>FaceID Login Integration</li>
                        <li>AR Product Previews</li>
                        <li>Siri Business Commands</li>
                    </ul>
                    <button className={styles.btn}>
                        DOWNLOAD For iOS
                    </button>
                </HolographicCard>

                {/* Android Section */}
                <HolographicCard title="Android OS" className={styles.card}>
                    <div className={styles.icon}>🤖</div>
                    <h3>Samsung, Pixel, Tecno</h3>
                    <ul className={styles.features}>
                        <li>Home Screen Widgets</li>
                        <li>NFC Payment Tap</li>
                        <li>Google Assistant Sync</li>
                    </ul>
                    <button className={styles.btn}>
                        DOWNLOAD For Android
                    </button>
                </HolographicCard>

                {/* Windows Section */}
                <HolographicCard title="Microsoft Windows" className={styles.card}>
                    <div className={styles.icon}>💻</div>
                    <h3>Windows 11 / 12</h3>
                    <ul className={styles.features}>
                        <li>Multi-Monitor Dashboard</li>
                        <li>Excel Live Data Link</li>
                        <li>Cortana Voice Control</li>
                    </ul>
                    <button className={styles.btn}>
                        DOWNLOAD For Windows
                    </button>
                </HolographicCard>
            </div>

            <div className={styles.instructions}>
                <h2>How to Install (Web App)</h2>
                <p>You can also install directly from this browser:</p>
                <div className={styles.steps}>
                    <span>1. Click &apos;Share&apos; or &apos;Menu&apos;</span>
                    <span>➜</span>
                    <span>2. Select &apos;Add to Home Screen&apos;</span>
                    <span>➜</span>
                    <span>3. Launch AI-AFRICA</span>
                </div>
            </div>
        </div>
    );
}
