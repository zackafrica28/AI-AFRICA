"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";

export default function CashFlowPage() {
    return (
        <ModulePage title="Cash Flow & Finance" subtitle="Liquidity Management & Forecasting">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <HolographicCard title="Instant Liquidity">
                    <p>Invoice factoring and spot line of credit.</p>
                </HolographicCard>
                <HolographicCard title="Expense Tracking">
                    <p>Real-time monitoring of operational costs.</p>
                </HolographicCard>
                <HolographicCard title="Forecasting AI">
                    <p>Predictive models for revenue and cash burn.</p>
                </HolographicCard>
                <HolographicCard title="Payroll Systems">
                    <p>Automated salary disbursement across currencies.</p>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
