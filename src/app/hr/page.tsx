"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function HRPage() {
    return (
        <ModulePage title="Talent & HR" subtitle="Workforce Management & Recruitment">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Town Hall">
                    <p>Post company-wide announcements instantly.</p>
                </HolographicCard>
                <HolographicCard title="CEO Broadcast">
                    <p>Live stream updates to all employees.</p>
                </HolographicCard>
                <HolographicCard title="Talent Search">
                    <p>Find skilled professionals across the continent.</p>
                </HolographicCard>
                <HolographicCard title="Payroll AI">
                    <p>Automated salary payments and tax compliance.</p>
                </HolographicCard>
                <HolographicCard title="Remote Teams">
                    <p>Tools for managing distributed workforces.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
