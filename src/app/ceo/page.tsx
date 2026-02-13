"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import { useRouter } from "next/navigation";

export default function CEOPage() {
    const router = useRouter();

    return (
        <ModulePage title="CEO's Office" subtitle="Executive Command & Control">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Executive Summary">
                    <p>High-level KPIs and performance metrics.</p>
                </HolographicCard>
                <HolographicCard title="Strategic Plan">
                    <p>AI-drafted 5-year growth roadmaps.</p>
                </HolographicCard>
                <HolographicCard title="Boardroom">
                    <p>Virtual meeting space for stakeholders.</p>
                </HolographicCard>
                <HolographicCard title="System Settings" onClick={() => router.push('/settings')}>
                    <p>Manage credentials and platform configuration.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
