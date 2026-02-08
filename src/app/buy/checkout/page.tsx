"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { ShoppingLock, ShieldCheck, MapPin } from "lucide-react";
import styles from "./checkout.module.css";

export default function BuyCheckout() {
    return (
        <ModulePage title="Quantum Checkout" subtitle="Secure your order through the neural transaction layer.">
            <div className={styles.layout}>
                <div className={styles.main}>
                    <HolographicCard title="Delivery Coordinates" variant="glass">
                        <div className={styles.field}>
                            <label>Shipping Hub</label>
                            <input type="text" placeholder="e.g. Lagos Terminal 4" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label>Contact Protocol</label>
                            <input type="email" placeholder="zack@ai-africa.com" className={styles.input} />
                        </div>
                    </HolographicCard>

                    <HolographicCard title="Payment Method">
                        <div className={styles.payment}>
                            <div className={styles.cardInfo}>
                                <ShoppingLock size={20} />
                                <span>•••• •••• •••• 4242</span>
                            </div>
                            <Button size="sm" variant="glass">Change</Button>
                        </div>
                    </HolographicCard>
                </div>

                <aside className={styles.sidebar}>
                    <HolographicCard title="Order Summary" variant="neon">
                        <div className={styles.summaryList}>
                            <div className={styles.item}><span>Subtotal</span><span>$1,200.00</span></div>
                            <div className={styles.item}><span>Neural Delivery</span><span>$45.00</span></div>
                            <div className={styles.total}><span>Total</span><span>$1,245.00</span></div>
                        </div>
                        <Button className={styles.fullWidth} variant="primary">Authorize Purchase</Button>
                        <div className={styles.secure}>
                            <ShieldCheck size={14} />
                            <span>AES-512 Encrypted</span>
                        </div>
                    </HolographicCard>
                </aside>
            </div>
        </ModulePage>
    );
}
