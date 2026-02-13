"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function DealCloserPage() {
    return (
        <ModulePage title="Smart Deal Closer" subtitle="Contracts, Signatures, & Payments">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Universal Guarantee">
                    <p>100% successful trade protection on all linked apps.</p>
                </HolographicCard>
                <HolographicCard title="AI Contracts">
                    <p>Generate legal agreements in seconds.</p>
                </HolographicCard>
                <HolographicCard title="E-Signature">
                    <p>Biometrically secured signing for all parties.</p>
                </HolographicCard>
                <HolographicCard title="Instant Pay">
                    <p>Stripe-integrated global payment gateway.</p>
                </HolographicCard>
                <HolographicCard title="Escrow Release">
                    <p>Automated fund release upon milestone completion.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
