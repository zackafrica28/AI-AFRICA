"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import HoloFeed from "@/components/ui/HoloFeed";

export default function ResidentialRealEstatePage() {
    return (
        <ModulePage title="Residential Real Estate" subtitle="Smart Homes, Condos, & Living Spaces">
            <HoloFeed />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <HolographicCard title="Luxury Apartments">
                    <p>AI-integrated living spaces in major metropolises.</p>
                </HolographicCard>
                <HolographicCard title="Eco-Villas">
                    <p>Sustainable, off-grid homes powered by green energy.</p>
                </HolographicCard>
                <HolographicCard title="Affordable Housing">
                    <p>Modular, 3D-printed homes for rapid development.</p>
                </HolographicCard>
                <HolographicCard title="Virtual RealityTours">
                    <p>Experience properties from anywhere in the world.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
