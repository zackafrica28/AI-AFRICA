"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function IndustriesPage() {
    return (
        <ModulePage title="Industries Hall" subtitle="Sector-Wide Intelligence & Networking">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Mining & Minerals">
                    <p>Rare earth metals tracking and trading.</p>
                </HolographicCard>
                <HolographicCard title="Textiles">
                    <p>Cotton to fashion supply chain visibility.</p>
                </HolographicCard>
                <HolographicCard title="Technology">
                    <p>Software and hardware development hubs.</p>
                </HolographicCard>
                <HolographicCard title="Tourism">
                    <p>Eco-tourism and hospitality investments.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
