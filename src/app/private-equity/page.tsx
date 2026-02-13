"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function PrivateEquityPage() {
    return (
        <ModulePage title="Private Equity" subtitle="Venture Capital, Mergers, & Acquisitions">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Deal Flow">
                    <p>Access exclusive high-value opportunities.</p>
                </HolographicCard>
                <HolographicCard title="Investor Match">
                    <p>AI matching with global sovereign funds.</p>
                </HolographicCard>
                <HolographicCard title="Due Diligence">
                    <p>Automated risk assessment and auditing.</p>
                </HolographicCard>
                <HolographicCard title="Exit Strategy">
                    <p>Planning for IPOs and strategic buyouts.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
