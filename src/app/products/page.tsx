"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function ProductsPage() {
    return (
        <ModulePage title="New Products" subtitle="Innovation Showcase & Launchpad">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Marketing Studio">
                    <p>AI-generated campaigns for product launches.</p>
                </HolographicCard>
                <HolographicCard title="Viral Booster">
                    <p>Push your products to 20B users instantly.</p>
                </HolographicCard>
                <HolographicCard title="Trending Now">
                    <p>The hottest new African inventions this week.</p>
                </HolographicCard>
                <HolographicCard title="Tech Launchpad">
                    <p>Beta test software and hardware exclusives.</p>
                </HolographicCard>
                <HolographicCard title="Crowdfunding">
                    <p>Back breakthrough ideas directly.</p>
                </HolographicCard>
                <HolographicCard title="Patent Market">
                    <p>Buy and sell intellectual property rights.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
