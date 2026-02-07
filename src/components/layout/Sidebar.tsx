"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import {
    LayoutDashboard,
    ShoppingBag,
    Tag,
    Cpu,
    Tv,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Briefcase,
    Users
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: ShoppingBag, label: "Buy", href: "/buy" },
    { icon: Tag, label: "Sell", href: "/sell" },
    { icon: Cpu, label: "AI OS", href: "/ai-os" },
    { icon: Tv, label: "Media Center", href: "/media" },
    { icon: Users, label: "CRM", href: "/crm" },
    { icon: TrendingUp, label: "Investments", href: "/investments" },
    { icon: Briefcase, label: "CEO Office", href: "/ceo", adminOnly: true },
    { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const { logout, isAdmin } = useAuth();

    return (
        <motion.aside
            className={`${styles.sidebar} ${isOpen ? styles.open : styles.collapsed}`}
            animate={{ width: isOpen ? 260 : 80 }}
        >
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <span className={styles.logoText}>AI</span>
                    {isOpen && <span className={styles.logoBrand}>AFRICA</span>}
                </div>
                <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    if (item.adminOnly && !isAdmin) return null;
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
                            <item.icon className={styles.icon} size={22} />
                            {isOpen && <span className={styles.navLabel}>{item.label}</span>}
                            {isActive && <motion.div layoutId="activeNav" className={styles.activeIndicator} />}
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button onClick={logout} className={styles.logoutBtn}>
                    <LogOut size={22} />
                    {isOpen && <span className={styles.navLabel}>Disconnect</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
