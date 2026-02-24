"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import StatCard from "@/components/ui/StatCard";
import { Wallet, ArrowUpRight, ArrowDownLeft, Zap, Shield, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function CashFlowPage() {
    const { profile } = useAuth();
    const [walletData, setWalletData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.id) {
            fetch(`/api/wallet?userId=${profile.id}`)
                .then(res => res.json())
                .then(data => {
                    setWalletData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Wallet fetch error:", err);
                    setLoading(false);
                });
        }
    }, [profile?.id]);

    if (loading) return (
        <ModulePage title="Cash Flow & Finance" subtitle="Syncing ledger nodes...">
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="neon-spinner"></div>
            </div>
        </ModulePage>
    );

    return (
        <ModulePage title="Cash Flow & Finance" subtitle="Liquidity Management & Forecasting">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    label="Wallet Balance"
                    value={`$${walletData?.balance?.toLocaleString() || "0.00"}`}
                    icon={Wallet}
                    color="#ff6600"
                />
                <StatCard
                    label="Instant Liquidity"
                    value="$1,500.00"
                    icon={Zap}
                    color="#ff8c00"
                />
                <StatCard
                    label="Protected Funds"
                    value="$0.00"
                    icon={Shield}
                    color="#10b981"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HolographicCard title="Financial Overview" variant="glass">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                            <div>
                                <p className="text-muted text-sm uppercase tracking-widest">Available Credit</p>
                                <h3 className="text-2xl font-bold">$25,000.00</h3>
                            </div>
                            <Button size="sm" variant="primary" leftIcon={<Plus size={16} />}>Request Node</Button>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase text-accent">Expense Forecast</h4>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: '35%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted">
                                <span>35% Neural Capacity</span>
                                <span>$8,750 / $25,000</span>
                            </div>
                        </div>
                    </div>
                </HolographicCard>

                <HolographicCard title="Transaction Neural Feed" variant="glass">
                    <div className="space-y-4">
                        {!walletData?.transactions || walletData.transactions.length === 0 ? (
                            <div className="text-center py-10 opacity-50">No ledger entries detected.</div>
                        ) : (
                            walletData.transactions.map((tx: any) => (
                                <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${tx.amount > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                                            {tx.amount > 0 ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-wide">{tx.type.replace('_', ' ')}</p>
                                            <span className="text-[10px] text-muted">{new Date(tx.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <p className={`font-bold ${tx.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                                        {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
