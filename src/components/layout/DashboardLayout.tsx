"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import styles from "./DashboardLayout.module.css";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    // Pages that shouldn't have the dashboard layout (e.g., login, landing)
    // Adjust logic as needed if using Route Groups instead
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        return <>{children}</>;
    }

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <main className={`${styles.mainContent} ${isSidebarOpen ? styles.shifted : styles.fullWidth}`}>
                {children}
            </main>

            <MobileNav />
        </div>
    );
}
