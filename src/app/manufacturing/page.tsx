"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function ManufacturingPage() {
    return (
        <ModulePage title="Manufacturing Hub" subtitle="Smart Factories, Supply Chain, & Production">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Smart Factory Setup">
                    <p>IoT-enabled production lines and automation tools.</p>
                </HolographicCard>
                <HolographicCard title="Raw Materials">
                    <p>Direct sourcing of minerals, fabrics, and components.</p>
                </HolographicCard>
                <HolographicCard title="Supply Chain AI">
                    <p>Predictive logistics and inventory management.</p>
                </HolographicCard>
                <HolographicCard title="Contract Manufacturing">
                    <p>Connect with verified factories for your product.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
