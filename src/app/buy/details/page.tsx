"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import styles from "./details.module.css";
import Link from "next/link";

export default function ProductDetails() {
    return (
        <ModulePage title="Product Intel" subtitle="Detailed specifications and neural security verification.">
            <div className={styles.layout}>
                <div className={styles.main}>
                    <HolographicCard variant="glass" className={styles.visuals}>
                        <img src="https://via.placeholder.com/600x400" alt="Product" />
                    </HolographicCard>

                    <div className={styles.tabs}>
                        <button className={styles.activeTab}>Specifications</button>
                        <button>Sustainability</button>
                        <button>Reviews</button>
                    </div>

                    <div className={styles.description}>
                        <p>The Neural Processing Unit X1 is the pinnacle of African semiconductor engineering. Designed for autonomous agents, it provides 1.2 Petaflops of localized processing power with near-zero latency.</p>
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    <HolographicCard title="NPU-X1 Edition" variant="neon">
                        <h2 className={styles.price}>$1,200.00</h2>
                        <p className={styles.limited}>Limited Stock: 12 Units Left</p>

                        <div className={styles.buyingControls}>
                            <Link href="/buy/checkout" className={styles.fullWidth}>
                                <Button className={styles.fullWidth} variant="primary">Acquire Now</Button>
                            </Link>
                            <Button className={styles.fullWidth} variant="glass">Add to Wishlist</Button>
                        </div>

                        <div className={styles.perks}>
                            <div className={styles.perk}><ShieldCheck size={16} /> <span>3yr Neural Warranty</span></div>
                            <div className={styles.perk}><Truck size={16} /> <span>Express Node Delivery</span></div>
                            <div className={styles.perk}><RefreshCcw size={16} /> <span>30 Day Synapse Return</span></div>
                        </div>
                    </HolographicCard>
                </aside>
            </div>
        </ModulePage>
    );
}
