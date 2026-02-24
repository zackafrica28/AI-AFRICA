"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface UIContextType {
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // Persist sidebar state in localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sidebar_open");
        if (saved !== null) {
            setSidebarOpen(saved === "true");
        }
    }, []);

    const handleSetSidebarOpen = (open: boolean) => {
        setSidebarOpen(open);
        localStorage.setItem("sidebar_open", String(open));
    };

    const toggleSidebar = () => {
        const next = !isSidebarOpen;
        setSidebarOpen(next);
        localStorage.setItem("sidebar_open", String(next));
    };

    return (
        <UIContext.Provider value={{ isSidebarOpen, setSidebarOpen: handleSetSidebarOpen, toggleSidebar }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error("useUI must be used within a UIProvider");
    }
    return context;
}
