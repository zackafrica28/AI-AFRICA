"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HolographicCard from "@/components/ui/HolographicCard";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";
import {
    Cpu,
    MessageSquare,
    TrendingUp,
    Shield,
    Zap,
    Play,
    Pause,
    BarChart3
} from "lucide-react";
import styles from "./overview.module.css";
import { useAuth } from "@/context/AuthContext";
import { getUserAgents, updateAgentState } from "@/server/actions/agent";

export default function AIOSOverview() {
    const { user } = useAuth();
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) return;
        setLoading(true);
        getUserAgents(user.uid).then(data => {
            setAgents(data);
            setLoading(false);
        });
    }, [user?.uid]);

    if (loading) {
        return <DashboardLayout><div className="flex items-center justify-center min-h-[60vh]"><div className="neon-spinner"></div></div></DashboardLayout>;
    }

    const toggleAgent = async (agentId: string, currentStatus: boolean) => {
        const nextStatus = !currentStatus;
        await updateAgentState(agentId, nextStatus);
        setAgents(agents.map(a => a.id === agentId ? { ...a, active: nextStatus } : a));
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className="neon-text">AI Business Workforce</h1>
                    <p>Autonomous intelligence nodes managing your regional trade operations.</p>
                </header>

                <div className={styles.stats}>
                    <StatCard label="Total Computes" value="1.2k" icon={Zap} />
                    <StatCard label="Decisions Made" value="482" icon={Cpu} color="#ff8c00" />
                    <StatCard label="Efficiency" value="99.8%" icon={TrendingUp} color="#10b981" />
                </div>

                <div className={styles.agentGrid}>
                    {agents.map(agent => (
                        <HolographicCard
                            key={agent.id}
                            title={agent.name || agent.type}
                            subtitle={agent.type === "SALES" ? "Optimizing conversions" : "Automating operations"}
                        >
                            <div className={styles.agentCardContent}>
                                <div className={styles.agentMeta}>
                                    <div className={`${styles.statusBadge} ${agent.active ? styles.running : ""}`}>
                                        {agent.active ? "RUNNING" : "IDLE"}
                                    </div>
                                    <span className={styles.uptime}>Uptime: 14h 22m</span>
                                </div>

                                <div className={styles.capabilities}>
                                    {['MoMo Analysis', 'Market Scraper', 'Smart CRM'].map(cap => (
                                        <span key={cap} className={styles.capBadge}>{cap}</span>
                                    ))}
                                </div>

                                <div className={styles.actions}>
                                    <Button
                                        size="sm"
                                        variant={agent.active ? "glass" : "primary"}
                                        onClick={() => toggleAgent(agent.id, agent.active)}
                                        leftIcon={agent.active ? <Pause size={14} /> : <Play size={14} />}
                                    >
                                        {agent.active ? "Halt Node" : "Activate Agent"}
                                    </Button>
                                    <Button size="sm" variant="glass" leftIcon={<BarChart3 size={14} />}>Logs</Button>
                                </div>
                            </div>
                        </HolographicCard>
                    ))}

                    <HolographicCard title="Deploy New Agent" subtitle="Expand your autonomous workforce">
                        <div className={styles.deployBox}>
                            <p>Choose an agent template to solve your business bottlenecks.</p>
                            <div className={styles.templates}>
                                <button className={styles.templateItem}>
                                    <MessageSquare size={20} />
                                    <span>Support AI</span>
                                </button>
                                <button className={styles.templateItem}>
                                    <TrendingUp size={20} />
                                    <span>Revenue AI</span>
                                </button>
                                <button className={styles.templateItem}>
                                    <Shield size={20} />
                                    <span>Fraud AI</span>
                                </button>
                            </div>
                            <Button className={styles.deployBtn} leftIcon={<Plus size={18} />}>Hire Neural Asset</Button>
                        </div>
                    </HolographicCard>
                </div>
            </div>
        </DashboardLayout>
    );
}

function Plus(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>;
}
