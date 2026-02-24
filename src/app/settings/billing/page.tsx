"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import { useAuth } from "@/context/AuthContext";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";

export default function SettingsBillingPage() {
    const { profile } = useAuth();
    const [sub, setSub] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.id) {
            fetch(`/api/billing?userId=${profile.id}`)
                .then(res => res.json())
                .then(data => {
                    const active = data.subscriptions?.find((s: any) => s.active);
                    setSub(active);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [profile?.id]);

    if (loading) return <ModulePage title="Billing & Subscription" subtitle="Plan Management"><div className="neon-spinner"></div></ModulePage>;

    return (
        <ModulePage title="Billing & Subscription" subtitle="Plan Management">
            <div className="max-w-4xl space-y-8">
                <HolographicCard title="Current Plan" variant="neon">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter text-accent">{sub ? sub.plan.toUpperCase() : "FREE TIER"}</h2>
                            <p className="text-muted text-sm mt-1">{sub ? "Active Since: " + new Date(sub.createdAt).toLocaleDateString() : "Limited functionality node."}</p>
                        </div>
                        <Button variant="primary">Upgrade Node</Button>
                    </div>
                </HolographicCard>

                <HolographicCard title="Security & Compliance" variant="glass">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="font-bold">Neural Protection Active</p>
                            <span className="text-xs text-muted">Your payment methods are encrypted on the regional grid.</span>
                        </div>
                    </div>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
