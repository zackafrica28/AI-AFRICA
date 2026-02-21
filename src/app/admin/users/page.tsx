"use client";

import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { Shield, Ban, CheckCircle } from "lucide-react";
import styles from "./admin-users.module.css";
import { useAuth } from "@/context/AuthContext";

export default function AdminUsers() {
    const { profile } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/admin/users");
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        }
        if (profile?.role === "CEO") {
            fetchUsers();
        }
    }, [profile]);

    if (profile?.role !== "CEO") {
        return <ModulePage title="Access Denied" subtitle="Master override required."><div></div></ModulePage>;
    }

    if (loading) return <ModulePage title="Decrypting User Database..." subtitle="Accessing Secure Nodes."><div className="neon-spinner"></div></ModulePage>;

    return (
        <ModulePage title="Platform Governance" subtitle="Manage all neural identities on the AI-AFRICA network.">
            <div className={styles.container}>
                <HolographicCard title="User Registry" variant="glass">
                    <div className={styles.table}>
                        <div className={styles.header}>
                            <span>Name / Email</span>
                            <span>Role</span>
                            <span>Status</span>
                            <span>Actions</span>
                        </div>
                        {users.map(u => (
                            <div key={u.id} className={styles.row}>
                                <div className={styles.userInfo}>
                                    <strong>{u.name || "Anonymous"}</strong>
                                    <span>{u.email}</span>
                                </div>
                                <div className={styles.roleBadge}>{u.role}</div>
                                <div className={styles.status}><CheckCircle size={14} /> Active</div>
                                <div className={styles.actions}>
                                    <Button size="sm" variant="glass" leftIcon={<Shield size={14} />}>Promote</Button>
                                    <Button size="sm" variant="glass" className={styles.banBtn} leftIcon={<Ban size={14} />}>Ban</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </HolographicCard>
            </div>
        </ModulePage>
    );
}
