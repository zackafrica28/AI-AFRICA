"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import HoloFeed from "@/components/ui/HoloFeed";

export default function CarsPage() {
    return (
        <ModulePage title="Cars & Motors" subtitle="Electric Agents, Autonomous Fleets, & Personal Transport">
            <HoloFeed />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <HolographicCard title="Electric Vehicles (EVs)">
                    <p>Latest models from African and Global manufacturers.</p>
                </HolographicCard>
                <HolographicCard title="Autonomous Fleet">
                    <p>Self-driving logistics trucks and delivery drones.</p>
                </HolographicCard>
                <HolographicCard title="Luxury Imports">
                    <p>Premium vehicles with instant customs clearance.</p>
                </HolographicCard>
                <HolographicCard title="Parts & Service">
                    <p>AI-diagnosed maintenance and spare parts.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
