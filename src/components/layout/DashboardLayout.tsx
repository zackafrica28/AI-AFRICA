"use client";

import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import styles from "./DashboardLayout.module.css";
import { usePathname } from "next/navigation";

import { useUI } from "@/context/UIContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen, setSidebarOpen } = useUI();
    const pathname = usePathname();

    // Pages that shouldn't have the dashboard layout (e.g., login, landing)
    // Adjust logic as needed if using Route Groups instead
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        return <>{children}</>;
    }

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

            <main className={`${styles.mainContent} ${isSidebarOpen ? styles.shifted : styles.fullWidth}`}>
                {children}
            </main>

            <MobileNav />
        </div>
    );
}
