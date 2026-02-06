"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function SmallFirmsPage() {
    return (
        <ModulePage title="Small Firms & SMEs" subtitle="Growth Tools, Grants, & Digital Transition">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Business Registration">
                    <p>Instant incorporation and licensing.</p>
                </HolographicCard>
                <HolographicCard title="Micro-Loans">
                    <p>AI-approved financing for daily operations.</p>
                </HolographicCard>
                <HolographicCard title="Digital Storefront">
                    <p>Create a web presence in 30 seconds.</p>
                </HolographicCard>
                <HolographicCard title="Mentor Connect">
                    <p>Link with industry veterans for guidance.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
