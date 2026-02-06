"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function OilGasPage() {
    return (
        <ModulePage title="Oil & Gas Intel" subtitle="Upstream, Midstream, & Downstream Analytics">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Reserve Mapping">
                    <p>Seismic data visualization of new fields.</p>
                </HolographicCard>
                <HolographicCard title="Pipeline Monitor">
                    <p>Real-time flow and integrity checks.</p>
                </HolographicCard>
                <HolographicCard title="Refinery Output">
                    <p>Optimization of crude processing.</p>
                </HolographicCard>
                <HolographicCard title="Market Prices">
                    <p>Live Brent and WTI crude pricing feeds.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
