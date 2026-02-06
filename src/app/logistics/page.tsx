"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function LogisticsPage() {
    return (
        <ModulePage title="Quantum Delivery" subtitle="Logistics, Shipping, & Fulfillment">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Track Shipment">
                    <p>Real-time GPS tracking of goods.</p>
                </HolographicCard>
                <HolographicCard title="Drone Dispatch">
                    <p>Deploy autonomous drones for local delivery.</p>
                </HolographicCard>
                <HolographicCard title="Freight Booking">
                    <p>Book cargo space on ships, planes, and trucks.</p>
                </HolographicCard>
                <HolographicCard title="Warehouse Ops">
                    <p>AI-managed inventory and fulfillment centers.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
