import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export async function getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

export async function getSessionToken(): Promise<string | null> {
    const user = await getCurrentUser();
    if (!user) return null;
    return await user.getIdToken();
}
