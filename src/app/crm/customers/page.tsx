"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import { useAuth } from "@/context/AuthContext";
import HolographicCard from "@/components/ui/HolographicCard";
import { Mail, Phone } from "lucide-react";

export default function CustomersPage() {
    const { profile } = useAuth();
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.id) {
            fetch(`/api/crm?userId=${profile.id}`)
                .then(res => res.json())
                .then(data => {
                    setCustomers(data.customers || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [profile?.id]);

    if (loading) return (
        <ModulePage title="Customers" subtitle="Syncing buyer nodes...">
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="neon-spinner"></div>
            </div>
        </ModulePage>
    );

    return (
        <ModulePage title="Customers" subtitle="Client Relationship Database">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.length === 0 ? (
                    <div className="col-span-full text-center py-20 opacity-50">
                        No customer nodes detected in your network.
                    </div>
                ) : (
                    customers.map((customer) => (
                        <HolographicCard key={customer.id} title={customer.name} variant="glass">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm opacity-80">
                                    <Mail size={14} className="text-accent" />
                                    <span>{customer.email || "No Email"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm opacity-80">
                                    <Phone size={14} className="text-accent" />
                                    <span>{customer.phone || "No Phone"}</span>
                                </div>
                                <div className="flex justify-between items-center mt-4 p-2 bg-accent/10 rounded">
                                    <span className="text-[10px] uppercase tracking-tighter opacity-70">Total Acquisition</span>
                                    <span className="font-bold text-accent">${customer.totalSpent.toLocaleString()}</span>
                                </div>
                            </div>
                        </HolographicCard>
                    ))
                )}
            </div>
        </ModulePage>
    );
}
