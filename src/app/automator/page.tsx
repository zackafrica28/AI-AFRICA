"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function AutomatorPage() {
    return (
        <ModulePage title="Neural Automator" subtitle="Workflow Automation & Integration">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Nexus Bridge">
                    <p>Connect & sync with 50+ external buy/sell apps.</p>
                </HolographicCard>
                <HolographicCard title="Workflow Builder">
                    <p>Drag-and-drop tool to connect your apps.</p>
                </HolographicCard>
                <HolographicCard title="AI Agents">
                    <p>Deploy autonomous agents for specific tasks.</p>
                </HolographicCard>
                <HolographicCard title="Integration Hub">
                    <p>Connect to 5,000+ external APIs.</p>
                </HolographicCard>
                <HolographicCard title="Process Mining">
                    <p>Identify bottlenecks in your operations.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
