"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FeedItem {
    id: string;
    category: "REAL_ESTATE" | "CARS" | "TECH" | "COMMODITIES" | "STOCK";
    title: string;
    source: string;
    price: string;
    timestamp: Date;
}

interface LiveFeedContextType {
    feed: FeedItem[];
    isScanning: boolean;
    toggleScanning: () => void;
}

const LiveFeedContext = createContext<LiveFeedContextType | undefined>(undefined);

const SAMPLE_SOURCES = ["Global Web", "Dark Net", "Local Listings", "Satellite Scan", "Gov Database"];
const TITLES = {
    REAL_ESTATE: ["Luxury Villa in Lagos", "Penthouse in Nairobi", "Commercial Plot in Cairo", "Beach House in Cape Town"],
    CARS: ["2026 Tesla CyberTruck", "Flying Car Prototype", "Toyota Land Cruiser V8", "Electric Bus Fleet"],
    TECH: ["Quantum Processor Batch", "Holographic Projectors", "AI Server Cluster", "Neural Link Kits"],
    COMMODITIES: ["Gold Bullion Lot", "Lithium Shipment", "Oil Barrel Futures", "Agri-Tech Harvest"],
    STOCK: ["AI-AFRICA Stock +5%", "Global Tech Index +2%", "Crypto Market Rally", "Forex Update"]
};

export function LiveFeedProvider({ children }: { children: React.ReactNode }) {
    const [feed, setFeed] = useState<FeedItem[]>([]);
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        if (!isScanning) return;

        const interval = setInterval(() => {
            const categories: (keyof typeof TITLES)[] = ["REAL_ESTATE", "CARS", "TECH", "COMMODITIES", "STOCK"];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const title = TITLES[category][Math.floor(Math.random() * TITLES[category].length)];
            const source = SAMPLE_SOURCES[Math.floor(Math.random() * SAMPLE_SOURCES.length)];
            const price = "$" + (Math.random() * 100000).toFixed(2);

            const newItem: FeedItem = {
                id: Math.random().toString(36).substr(2, 9),
                category,
                title,
                source,
                price,
                timestamp: new Date(),
            };

            setFeed((prev) => [newItem, ...prev].slice(0, 50)); // Keep last 50 items
        }, 3000); // New item every 3 seconds

        return () => clearInterval(interval);
    }, [isScanning]);

    const toggleScanning = () => setIsScanning(!isScanning);

    return (
        <LiveFeedContext.Provider value={{ feed, isScanning, toggleScanning }}>
            {children}
        </LiveFeedContext.Provider>
    );
}

export function useLiveFeed() {
    const context = useContext(LiveFeedContext);
    if (context === undefined) {
        throw new Error("useLiveFeed must be used within a LiveFeedProvider");
    }
    return context;
}
