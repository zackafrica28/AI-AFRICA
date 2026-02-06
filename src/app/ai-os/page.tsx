"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function AIOsPage() {
    return (
        <ModulePage title="AI Business OS" subtitle="The Central Intelligence Core">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Neural Automator">
                    <p>Connect apps and automate workflows instantly.</p>
                </HolographicCard>
                <HolographicCard title="Hyper-Targeting Radar">
                    <p>Find your perfect customers with AI precision.</p>
                </HolographicCard>
                <HolographicCard title="Sentient CRM">
                    <p>Leads that nurture themselves automatically.</p>
                </HolographicCard>
                <HolographicCard title="Business Coach">
                    <p>24/7 strategic advice from your AI CEO assistant.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
