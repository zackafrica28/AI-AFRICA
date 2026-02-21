"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import {
    LayoutDashboard,
    ShoppingBag,
    Cpu,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Briefcase,
    Users
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type MenuItem = {
    icon: React.ElementType;
    label: string;
    href: string;
    adminOnly?: boolean;
    subItems?: { label: string; href: string; icon?: React.ElementType }[];
};

const menuItems: MenuItem[] = [
    {
        icon: LayoutDashboard,
        label: "Command Center",
        href: "/dashboard"
    },
    {
        icon: Briefcase,
        label: "Business Hub",
        href: "/business",
        subItems: [
            { label: "My Stores", href: "/sell/listings" },
            { label: "Revenue Tracking", href: "/sell/revenue" },
            { label: "Inventory", href: "/sell/inventory" },
        ]
    },
    {
        icon: ShoppingBag,
        label: "Sourcing Hub",
        href: "/buy",
        subItems: [
            { label: "Marketplace", href: "/buy/marketplace" },
            { label: "Global Orders", href: "/buy/orders" },
        ]
    },
    {
        icon: Cpu,
        label: "AI Workforce",
        href: "/ai-os",
        subItems: [
            { label: "Active Agents", href: "/ai-os/overview" },
            { label: "Automations", href: "/ai-os/automations" },
        ]
    },
    {
        icon: TrendingUp,
        label: "Financial Center",
        href: "/finance",
        subItems: [
            { label: "MoMo Wallet", href: "/finance/wallet" },
            { label: "Payments", href: "/finance/payments" },
        ]
    },
    {
        icon: Users,
        label: "Customer Base",
        href: "/crm",
        subItems: [
            { label: "Retail Leads", href: "/crm/leads" },
            { label: "Client CRM", href: "/crm/customers" },
        ]
    },
    { icon: Settings, label: "System Config", href: "/settings" },
];

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const { logout, isAdmin } = useAuth();

    return (
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.open : styles.collapsed}`}
        >
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <span className={styles.logoText}>AI</span>
                    {isOpen && <span className={styles.logoBrand}>AFRICA</span>}
                </div>
                <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
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
                                    <item.icon className={styles.icon} size={20} />
                                    {isOpen && <span className={styles.navLabel}>{item.label}</span>}
                                </div>
                            </Link>

                            {/* Submenu - Only show if sidebar is open and item is active/expanded */}
                            {item.subItems && isOpen && isActive && (
                                <div className={styles.subMenu}>
                                    {item.subItems.map((sub) => (
                                        <Link
                                            key={sub.href}
                                            href={sub.href}
                                            className={`${styles.subItem} ${pathname === sub.href ? styles.subActive : ""}`}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button onClick={logout} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    {isOpen && <span className={styles.navLabel}>Secure Exit</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
