"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function GoodsServicesPage() {
    return (
        <ModulePage title="Goods & Services" subtitle="General Marketplace for Commodities & Skills">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="FMCG Trading">
                    <p>Fast-moving consumer goods bulk trading.</p>
                </HolographicCard>
                <HolographicCard title="Professional Services">
                    <p>Legal, accounting, and consultancy marketplace.</p>
                </HolographicCard>
                <HolographicCard title="Logistics Services">
                    <p>Freight forwarding and last-mile delivery.</p>
                </HolographicCard>
                <HolographicCard title="Digital Services">
                    <p>Cloud hosting, branding, and dev shops.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
