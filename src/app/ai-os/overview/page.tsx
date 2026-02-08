"use client";
import ModulePage from "@/components/ui/ModulePage";
import StatCard from "@/components/ui/StatCard";
import { Cpu, Activity, Zap, HardDrive } from "lucide-react";
import styles from "./overview.module.css";

export default function AIOSOverview() {
    return (
        <ModulePage title="Core OS Overview" subtitle="System resource allocation and real-time status.">
            <div className={styles.stats}>
                <StatCard label="CPU Usage" value="24%" trend={{ value: 5, isUp: false }} icon={Cpu} />
                <StatCard label="Neural Load" value="1.2 TB/s" trend={{ value: 12, isUp: true }} icon={Zap} color="#7000ff" />
                <StatCard label="Memory" value="14.2 GB" icon={HardDrive} color="#10b981" />
                <StatCard label="Active Nodes" value="482" icon={Activity} color="#f97316" />
            </div>
        </ModulePage>
    );
}
