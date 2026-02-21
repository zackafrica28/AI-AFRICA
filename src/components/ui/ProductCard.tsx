import Link from "next/link";
import Image from "next/image";
import HolographicCard from "./HolographicCard";
import Button from "./Button";
import styles from "./ProductCard.module.css";

interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    images: string[];
    vendor?: {
        name: string;
    }
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { id, title, price, images, category, vendor } = product;
    const image = images[0] || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800";
    const vendorName = vendor?.name || "AI-AFRICA Node";

    return (
        <HolographicCard className={styles.card} variant="glass">
            <div className={styles.imageContainer}>
                <Image src={image} alt={title} fill className={styles.image} />
                <span className={styles.category}>{category}</span>
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.vendor}>By {vendorName}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>${price.toLocaleString()}</span>
                    <Link href={`/buy/details?id=${id}`}>
                        <Button variant="primary" size="sm">Details</Button>
                    </Link>
                </div>
            </div>
        </HolographicCard>
    );
}
