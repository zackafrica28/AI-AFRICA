"use client";

import React from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function CompaniesExchangePage() {
    return (
        <ModulePage title="Companies Exchange" subtitle="B2B Networking & Partnerships">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Holo-Conference">
                    <p>Secure, lag-free B2B video meetings & board summits.</p>
                </HolographicCard>
                <HolographicCard title="Unity Hall">
                    <p>Virtual auditoriums for inter-company town halls.</p>
                </HolographicCard>
                <HolographicCard title="Partner Search">
                    <p>Find synergistic businesses for collaboration.</p>
                </HolographicCard>
                <HolographicCard title="Joint Ventures">
                    <p>Structure and launch partnership deals.</p>
                </HolographicCard>
                <HolographicCard title="Asset Swap">
                    <p>Trade underutilized assets and resources.</p>
                </HolographicCard>
                <HolographicCard title="Innovation Hub">
                    <p>Co-develop new products with other firms.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
