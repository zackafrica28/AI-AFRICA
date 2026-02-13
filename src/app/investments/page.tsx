"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function InvestmentsPage() {
    return (
        <ModulePage title="Global Investments" subtitle="Stocks, Crypto, & Assets">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Stock Markets">
                    <p>Real-time data from Johannesburg, Lagos, Nairobi, & Global exchanges.</p>
                </HolographicCard>
                <HolographicCard title="Crypto Vault">
                    <p>Secure digital asset management and trading.</p>
                </HolographicCard>
                <HolographicCard title="Gov Bonds">
                    <p>Stable returns from African sovereign debt.</p>
                </HolographicCard>
                <HolographicCard title="Angel Investing">
                    <p>Discover high-growth startups before they IPO.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
