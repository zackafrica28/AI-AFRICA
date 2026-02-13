"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function PolicyPage() {
    return (
        <ModulePage title="Gov & Policy" subtitle="Regulatory Compliance & Government Relations">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Compliance Checker">
                    <p>AI audit of your business against local laws.</p>
                </HolographicCard>
                <HolographicCard title="Tender Portal">
                    <p>Access government procurement opportunities.</p>
                </HolographicCard>
                <HolographicCard title="Tax Filing">
                    <p>Automated multi-jurisdiction tax submission.</p>
                </HolographicCard>
                <HolographicCard title="Policy Updates">
                    <p>Real-time alerts on regulatory changes.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
