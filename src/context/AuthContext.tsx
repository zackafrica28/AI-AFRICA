"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

interface User {
    email: string;
    role: "CEO" | "SUBSCRIBER" | "GUEST";
    subscriptionTier?: "TITANIUM" | "GOLD" | "NONE";
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    subscribe: (tier: "TITANIUM" | "GOLD") => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Simulating persistent session
    useEffect(() => {
        const storedUser = localStorage.getItem("ai_africa_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string) => {
        // STRICT CEO CHECK
        if (email.toLowerCase().includes("zackawudu")) {
            const ceoUser: User = { email, role: "CEO", subscriptionTier: "TITANIUM" };
            setUser(ceoUser);
            localStorage.setItem("ai_africa_user", JSON.stringify(ceoUser));
            router.push("/dashboard");
        } else {
            const guestUser: User = { email, role: "GUEST", subscriptionTier: "NONE" };
            setUser(guestUser);
            localStorage.setItem("ai_africa_user", JSON.stringify(guestUser));
            router.push("/subscribe"); // Redirect non-CEOs to pay
        }
    };

    const subscribe = (tier: "TITANIUM" | "GOLD") => {
        if (user) {
            const updatedUser: User = { ...user, role: "SUBSCRIBER", subscriptionTier: tier };
            setUser(updatedUser);
            localStorage.setItem("ai_africa_user", JSON.stringify(updatedUser));
            router.push("/dashboard");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("ai_africa_user");
        router.push("/");
    };

    const isAdmin = user?.role === "CEO";

    return (
        <AuthContext.Provider value={{ user, login, logout, subscribe, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
