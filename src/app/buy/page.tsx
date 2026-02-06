"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import HoloFeed from "@/components/ui/HoloFeed";

export default function BuyPage() {
    return (
        <ModulePage title="Buy Marketplace" subtitle="Global Sourcing & Procurement">
            <HoloFeed />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <HolographicCard title="Global App Search">
                    <p>Aggregate results from all small business apps.</p>
                </HolographicCard>
                <HolographicCard title="Global Suppliers">
                    <p>Verified suppliers from 195 countries.</p>
                </HolographicCard>
                <HolographicCard title="Bulk Orders">
                    <p>AI-negotiated rates for wholesale purchases.</p>
                </HolographicCard>
                <HolographicCard title="Escrow Secure">
                    <p>Payment protection until goods are delivered.</p>
                </HolographicCard>
                <HolographicCard title="Smart Contracts">
                    <p>Blockchain-backed purchase agreements.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
