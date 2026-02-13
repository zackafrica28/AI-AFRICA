"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function EnergyPage() {
    return (
        <ModulePage title="Green Energy" subtitle="Renewable Power & Grid Management">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Solar Projects">
                    <p>Invest in large-scale solar farms.</p>
                </HolographicCard>
                <HolographicCard title="Grid Balancing">
                    <p>AI optimization of power distribution.</p>
                </HolographicCard>
                <HolographicCard title="Carbon Credits">
                    <p>Trade carbon offsets and green certificates.</p>
                </HolographicCard>
                <HolographicCard title="Home Solutions">
                    <p>Residential battery and solar setups.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
