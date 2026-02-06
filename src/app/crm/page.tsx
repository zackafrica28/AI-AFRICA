"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function CRMPage() {
    return (
        <ModulePage title="Sentient CRM" subtitle="Customer Relations Intelligence">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Lead Scoring">
                    <p>AI predicts which leads will convert today.</p>
                </HolographicCard>
                <HolographicCard title="Auto-Outreach">
                    <p>Personalized email campaigns on autopilot.</p>
                </HolographicCard>
                <HolographicCard title="Client DNA">
                    <p>Deep insights into customer behavior and needs.</p>
                </HolographicCard>
                <HolographicCard title="Support Bot">
                    <p>24/7 AI agent handling customer queries.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
