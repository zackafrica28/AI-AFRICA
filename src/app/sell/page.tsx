"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import HoloFeed from "@/components/ui/HoloFeed";

export default function SellPage() {
    return (
        <ModulePage title="Sell Marketplace" subtitle="Global Distribution & Export">
            <HoloFeed />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <HolographicCard title="Omni-Channel Publish">
                    <p>Post once, appear on AI-AFRICA & all linked apps.</p>
                </HolographicCard>
                <HolographicCard title="Create Listing">
                    <p>AI-generated product descriptions and SEO.</p>
                </HolographicCard>
                <HolographicCard title="Global Reach">
                    <p>Instant translation to 50+ languages.</p>
                </HolographicCard>
                <HolographicCard title="Trade Finance">
                    <p>Export financing and insurance options.</p>
                </HolographicCard>
                <HolographicCard title="Analytics">
                    <p>Real-time buyer interest heatmaps.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
