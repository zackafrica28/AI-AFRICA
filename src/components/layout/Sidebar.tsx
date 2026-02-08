"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    Users,
    Activity,
    Layers,
    BarChart3,
    FileText,
    CreditCard,
    UserCircle,
    Package,
    Truck
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeSwitcher from "../ui/ThemeSwitcher";

type MenuItem = {
    icon: any;
    label: string;
    href: string;
    adminOnly?: boolean;
    subItems?: { label: string; href: string; icon?: any }[];
};

const menuItems: MenuItem[] = [
    {
        icon: LayoutDashboard,
        label: "Command Center",
        href: "/command-center"
    },
    {
        icon: Activity,
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        icon: Cpu,
        label: "AI OS",
        href: "/ai-os",
        subItems: [
            { label: "Overview", href: "/ai-os/overview" },
            { label: "Automations", href: "/ai-os/automations" },
            { label: "Analytics", href: "/ai-os/analytics" },
        ]
    },
    {
        icon: Users,
        label: "CRM",
        href: "/crm",
        subItems: [
            { label: "Leads", href: "/crm/leads" },
            { label: "Pipeline", href: "/crm/pipeline" },
            { label: "Customers", href: "/crm/customers" },
        ]
    },
    {
        icon: ShoppingBag,
        label: "Buy",
        href: "/buy",
        subItems: [
            { label: "Marketplace", href: "/buy/marketplace" },
            { label: "Orders", href: "/buy/orders" },
        ]
    },
    {
        icon: Tag,
        label: "Sell",
        href: "/sell",
        subItems: [
            { label: "Listings", href: "/sell/listings" },
            { label: "Revenue", href: "/sell/revenue" },
        ]
    },
    { icon: Tv, label: "Media Center", href: "/media" },
    { icon: TrendingUp, label: "Investments", href: "/investments" },
    { icon: Briefcase, label: "CEO Office", href: "/ceo", adminOnly: true },
    {
        icon: Settings,
        label: "Settings",
        href: "/settings",
        subItems: [
            { label: "Profile", href: "/settings/profile" },
            { label: "Billing", href: "/settings/billing" },
        ]
    },
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
            transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
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
                    const isActive = pathname.startsWith(item.href);

                    return (
                        <div key={item.href} className={styles.menuGroup}>
                            <Link
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            >
                                <div className={styles.navItemContent}>
                                    <item.icon className={styles.icon} size={22} />
                                    {isOpen && <span className={styles.navLabel}>{item.label}</span>}
                                </div>
                                {isActive && <motion.div layoutId="activeNav" className={styles.activeIndicator} />}
                            </Link>

                            {/* Submenu - Only show if sidebar is open and item is active/expanded */}
                            {item.subItems && isOpen && isActive && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className={styles.subMenu}
                                >
                                    {item.subItems.map((sub) => (
                                        <Link
                                            key={sub.href}
                                            href={sub.href}
                                            className={`${styles.subItem} ${pathname === sub.href ? styles.subActive : ""}`}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <div className="mb-4 flex justify-center w-full">
                    {isOpen && <ThemeSwitcher />}
                </div>
                <button onClick={logout} className={styles.logoutBtn}>
                    <LogOut size={22} />
                    {isOpen && <span className={styles.navLabel}>Disconnect</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
