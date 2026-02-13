"use client";
import FluxNavbar from "@/components/ui/FluxNavbar";
import styles from "./ModulePage.module.css";
import { useRouter } from "next/navigation";

interface ModulePageProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const ModulePage: React.FC<ModulePageProps> = ({ title, subtitle, children }) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <FluxNavbar />

            <main className={styles.main}>
                <button onClick={() => router.back()} className={styles.backBtn}>
                    ← BACK TO DASHBOARD
                </button>

                <header className={styles.header}>
                    <h1 className="neon-text">{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </header>

                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default ModulePage;
