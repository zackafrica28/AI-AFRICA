"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function AgriPage() {
    return (
        <ModulePage title="Agri-Tech Futures" subtitle="Smart Farming & Food Security">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Crop Monitoring">
                    <p>Satellite analysis of soil health and yields.</p>
                </HolographicCard>
                <HolographicCard title="Marketplace">
                    <p>Direct farm-to-table trading platform.</p>
                </HolographicCard>
                <HolographicCard title="Smart Irrigation">
                    <p>IoT-controlled water management systems.</p>
                </HolographicCard>
                <HolographicCard title="Agri-Finance">
                    <p>Loans and insurance for farmers.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}

