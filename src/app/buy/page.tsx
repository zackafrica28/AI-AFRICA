"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import HoloFeed from "@/components/ui/HoloFeed";
import MarketplaceFeed from "@/components/ui/MarketplaceFeed";

export default function BuyPage() {
    return (
        <ModulePage title="Buy Marketplace" subtitle="Global Sourcing & Procurement">
            <HoloFeed />
            <div style={{ marginTop: '2rem' }}>
                <h2 className="neon-text" style={{ marginBottom: '1.5rem' }}>Neural Market Assets</h2>
                <MarketplaceFeed />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
                <HolographicCard title="Global App Search">
                    <p>Aggregate results from all small business apps.</p>
                </HolographicCard>
                <HolographicCard title="Global Suppliers">
                    <p>Verified suppliers from 195 countries.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
