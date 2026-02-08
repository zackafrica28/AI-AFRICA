"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    Cpu,
    Users,
    Menu
} from "lucide-react";
import styles from "./MobileNav.module.css";

const navItems = [
    { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
    { icon: Cpu, label: "AI OS", href: "/ai-os" },
    { icon: Users, label: "CRM", href: "/crm" },
    { icon: ShoppingBag, label: "Market", href: "/buy" },
    { icon: Menu, label: "Menu", href: "/command-center" }, // Acts as 'More' or Hub
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className={styles.mobileNav}>
            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
                        <div className={styles.iconWrapper}>
                            <item.icon size={24} />
                            {isActive && <motion.div layoutId="mobileNavIndicator" className={styles.activeDot} />}
                        </div>
                        <span className={styles.label}>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
