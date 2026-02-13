"use client";
import FluxNavbar from "@/components/ui/FluxNavbar";
import HolographicCard from "@/components/ui/HolographicCard";
import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";

// Mock Data for 28 Sections
const sections = [
    { id: "dashboard", title: "My Dashboard", icon: "💎" },
    { id: "buy", title: "Buy Marketplace", icon: "🛒" },
    { id: "sell", title: "Sell Marketplace", icon: "🏷️" },
    { id: "industries", title: "Industries Hall", icon: "🏭" },
    { id: "small-firms", title: "Small Firms & SMEs", icon: "🏪" },
    { id: "private-equity", title: "Private Equity", icon: "🤝" },
    { id: "cash-flow", title: "Cash Flow & Finance", icon: "💸" },
    { id: "real-estate-comm", title: "Commercial Real Estate", icon: "🏢" },
    { id: "real-estate-res", title: "Residential Real Estate", icon: "🏠" },
    { id: "cars", title: "Cars & Motors", icon: "🚗" },
    { id: "companies-ex", title: "Companies Exchange", icon: "📈" },
    { id: "manufacturing", title: "Manufacturing Hub", icon: "🏗️" },
    { id: "goods-services", title: "Goods & Services", icon: "🛠️" },
    { id: "oil-gas", title: "Oil & Gas Intel", icon: "🛢️" },
    { id: "ai-os", title: "AI Business OS", icon: "🧠" },
    { id: "media", title: "Holo-Media Center", icon: "📺" },
    { id: "ceo", title: "CEO's Office", icon: "💼" },
    { id: "investments", title: "Global Investments", icon: "🌐" },
    { id: "products", title: "New Products", icon: "✨" },
    { id: "deal-closer", title: "Smart Deal Closer", icon: "💳" },
    { id: "crm", title: "Sentient CRM", icon: "👥" },
    { id: "logistics", title: "Quantum Delivery", icon: "📦" },
    { id: "hr", title: "Talent & HR", icon: "🧑‍🤝‍🧑" },
    { id: "agri", title: "Agri-Tech Futures", icon: "🌾" },
    { id: "energy", title: "Green Energy", icon: "⚡" },
    { id: "policy", title: "Gov & Policy", icon: "🏛️" },
    { id: "automator", title: "Neural Automator", icon: "🤖" },
    { id: "settings", title: "System Settings", icon: "⚙️" },
];

export default function Dashboard() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <FluxNavbar />

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1 className="neon-text">Command Center</h1>
                    <p className={styles.date}>2226 AD • Sector Africa</p>
                </header>

                <div className={styles.grid}>
                    {sections.map((section) => (
                        <HolographicCard
                            key={section.id}
                            title={section.title}
                            className={styles.card}
                            onClick={() => router.push(`/${section.id}`)}
                        >
                            <div className={styles.icon}>{section.icon}</div>
                            <div className={styles.status}>System Active</div>
                        </HolographicCard>
                    ))}
                </div>
            </main>
        </div>
    );
}
