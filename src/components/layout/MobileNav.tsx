"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Cpu,
    Briefcase,
    TrendingUp
} from "lucide-react";
import styles from "./MobileNav.module.css";

const navItems = [
    { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
    { icon: Briefcase, label: "Business", href: "/business" },
    { icon: Cpu, label: "AI OS", href: "/ai-os" },
    { icon: TrendingUp, label: "Finance", href: "/finance" },
    { icon: ShoppingBag, label: "Trade", href: "/buy" },
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
                            <item.icon size={20} />
                        </div>
                        <span className={styles.label}>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
