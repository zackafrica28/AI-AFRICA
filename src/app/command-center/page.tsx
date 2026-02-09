"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Activity, ShieldCheck, Zap, Globe } from "lucide-react";
import HolographicCard from "@/components/ui/HolographicCard";

import { useAuth } from "@/context/AuthContext";

export default function CommandCenterPage() {
    const { profile, loading } = useAuth();

    if (loading) return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-screen text-accent">Initializing Command Protocol...</div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout>
            <div className="p-6">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold neon-text mb-2">COMMAND CENTER</h1>
                        <p className="text-gray-400">
                            Operator: <span className="text-white font-mono">{profile?.email || "UNKNOWN"}</span> •
                            Role: <span className="text-accent">{profile?.role || "GUEST"}</span>
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <HolographicCard title="System Health" variant="neon" className="h-full">
                        <div className="flex items-center gap-4 mb-2">
                            <Activity className="text-green-400" size={32} />
                            <div>
                                <div className="text-3xl font-bold">100%</div>
                                <p className="text-xs text-gray-500">All nodes operational</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded mt-2">
                            <div className="bg-green-500 h-2 rounded" style={{ width: "100%" }}></div>
                        </div>
                    </HolographicCard>

                    <HolographicCard title="Security Level" variant="glass" className="h-full">
                        <div className="flex items-center gap-4 mb-2">
                            <ShieldCheck className="text-blue-400" size={32} />
                            <div>
                                <div className="text-2xl font-bold">{profile?.subscriptionTier || "FREE"}</div>
                                <p className="text-xs text-gray-500">Encrypted via Quantum Key</p>
                            </div>
                        </div>
                    </HolographicCard>

                    <HolographicCard title="Active Agents" variant="glass" className="h-full">
                        <div className="flex items-center gap-4 mb-2">
                            <Zap className="text-yellow-400" size={32} />
                            <div>
                                <div className="text-3xl font-bold">3</div>
                                <p className="text-xs text-gray-500">Autonomous Tasks Running</p>
                            </div>
                        </div>
                    </HolographicCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <HolographicCard title="Global Network Map" className="min-h-[300px]">
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                            <Globe size={48} className="text-accent opacity-50" />
                            <p>Visualizing Pan-African Data Nodes...</p>
                        </div>
                    </HolographicCard>

                    <div className="grid grid-cols-1 gap-6">
                        <HolographicCard title="Server Load">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm">Main Cluster</span>
                                <span className="text-accent">24%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1.5 rounded">
                                <div className="bg-accent h-1.5 rounded" style={{ width: "24%" }}></div>
                            </div>

                            <div className="flex items-center justify-between mb-2 mt-4">
                                <span className="text-sm">Database Shards</span>
                                <span className="text-accent-secondary">48%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1.5 rounded">
                                <div className="bg-accent-secondary h-1.5 rounded" style={{ width: "48%" }}></div>
                            </div>
                        </HolographicCard>

                        <HolographicCard title="Recent Activity">
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    User Login: CEO (Localhost)
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    Module Activated: CRM
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    System Optimization: Auto-Scale
                                </li>
                            </ul>
                        </HolographicCard>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
