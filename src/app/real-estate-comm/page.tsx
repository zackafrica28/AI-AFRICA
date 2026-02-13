"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function CommercialRealEstatePage() {
    return (
        <ModulePage title="Commercial Real Estate" subtitle="Offices, Warehouses, & Industrial Zones">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Available Offices">
                    <p>Scan for premium office spaces across 54 nations.</p>
                </HolographicCard>
                <HolographicCard title="Industrial Warehouses">
                    <p>Logistics hubs and factory floors ready for lease.</p>
                </HolographicCard>
                <HolographicCard title="Retail Spaces">
                    <p>High-traffic zones for next-gen commerce.</p>
                </HolographicCard>
                <HolographicCard title="Smart City Zones">
                    <p>Investment opportunities in future cities.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
