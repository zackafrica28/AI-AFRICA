"use client";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import { Search, Filter, ShoppingCart } from "lucide-react";
import styles from "./marketplace.module.css";
import Link from "next/link";

const PRODUCTS = [
    { id: 1, name: "Neural Processing Unit X1", price: "$1,200", category: "Hardware", image: "https://via.placeholder.com/150" },
    { id: 2, name: "African Smart Home Hub", price: "$450", category: "IoT", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Solar Grid Optimizer", price: "$2,800", category: "Energy", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Quantum Security Key", price: "$150", category: "Security", image: "https://via.placeholder.com/150" },
];

export default function BuyMarketplace() {
    return (
        <ModulePage title="The Neural Marketplace" subtitle="Source the future of African technology and goods.">
            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <Search size={18} />
                    <input type="text" placeholder="Search products..." />
                </div>
                <Button variant="glass" leftIcon={<Filter size={18} />}>Filters</Button>
            </div>

            <div className={styles.grid}>
                {PRODUCTS.map((product) => (
                    <HolographicCard key={product.id} className={styles.productCard} interactive={true}>
                        <div className={styles.imageOverlay}>
                            <img src={product.image} alt={product.name} />
                            <span className={styles.productBadge}>{product.category}</span>
                        </div>
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <p className={styles.productPrice}>{product.price}</p>
                            <div className={styles.actions}>
                                <Link href={`/buy/details?id=${product.id}`}>
                                    <Button size="sm" variant="glass">View Details</Button>
                                </Link>
                                <Button size="sm" variant="primary" leftIcon={<ShoppingCart size={14} />}>Add</Button>
                            </div>
                        </div>
                    </HolographicCard>
                ))}
            </div>
        </ModulePage>
    );
}
