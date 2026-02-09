"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User as FirebaseUser
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { syncUserWithDb } from "@/lib/auth-sync";

interface UserProfile {
    email: string;
    role: "CEO" | "SUBSCRIBER" | "GUEST" | "VENDOR";
    subscriptionTier: "TITANIUM" | "GOLD" | "NONE";
    createdAt?: string;
    activeModules?: string[];
}

interface AuthContextType {
    user: FirebaseUser | null;
    profile: UserProfile | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                // Sync with Postgres DB
                syncUserWithDb(firebaseUser.uid, firebaseUser.email || "", firebaseUser.displayName || undefined)
                    .catch(err => console.error("Postgres Sync Error:", err));

                // Fetch profile from Firestore
                const docRef = doc(db, "users", firebaseUser.uid);

                try {
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProfile(docSnap.data() as UserProfile);
                    } else {
                        // Create default profile if missing
                        const newProfile: UserProfile = {
                            email: firebaseUser.email || "",
                            role: firebaseUser.email?.includes("zackawudu") ? "CEO" : "GUEST",
                            subscriptionTier: "NONE",
                            createdAt: new Date().toISOString(),
                            activeModules: ["ai-os"]
                        };
                        await setDoc(docRef, newProfile);
                        setProfile(newProfile);
                    }
                } catch (err) {
                    console.error("Error fetching user profile:", err);
                    // Fallback to basic profile to allow login even if DB fails
                    setProfile({
                        email: firebaseUser.email || "",
                        role: "GUEST",
                        subscriptionTier: "NONE"
                    });
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, pass: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        await signOut(auth);
        router.push("/");
    };

    const isAdmin = profile?.role === "CEO";

    return (
        <AuthContext.Provider value={{ user, profile, loading, login, logout, isAdmin }}>
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

