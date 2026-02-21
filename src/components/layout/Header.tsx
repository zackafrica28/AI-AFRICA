"use client";

import React from "react";
import styles from "./Header.module.css";
import { Menu, Search, Bell, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { user, profile } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <button className={styles.menuToggle} onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className={styles.search}>
                    <Search size={18} className={styles.searchIcon} />
                    <input type="text" placeholder="Search the Neural Grid..." className={styles.searchInput} />
                </div>
            </div>

            <div className={styles.right}>
                <button className={styles.actionBtn}>
                    <Bell size={20} />
                    <span className={styles.badge} />
                </button>

                <motion.div whileHover={{ scale: 1.05 }} className={styles.userProfile}>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user?.email?.split('@')[0] || "Guest"}</span>
                        <span className={styles.userRole}>{profile?.role || "GUEST"}</span>
                    </div>
                    <div className={styles.avatar}>
                        <User size={20} />
                    </div>
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
