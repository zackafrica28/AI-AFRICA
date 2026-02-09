import Link from "next/link";
import Image from "next/image";
import HolographicCard from "./HolographicCard";
import Button from "./Button";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    vendorName: string;
}

export default function ProductCard({ id, title, price, image, category, vendorName }: ProductCardProps) {
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
