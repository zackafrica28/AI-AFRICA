"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import styles from "./ModulePage.module.css";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface ModulePageProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const ModulePage: React.FC<ModulePageProps> = ({ title, subtitle, children }) => {
    const router = useRouter();

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <button onClick={() => router.back()} className={styles.backBtn}>
                    <ChevronLeft size={18} />
                    <span>Back</span>
                </button>

                <header className={styles.header}>
                    <h1 className="neon-text">{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </header>

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ModulePage;
