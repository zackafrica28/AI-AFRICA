"use client";
import { useEffect, useState } from "react";
import ModulePage from "@/components/ui/ModulePage";
import HolographicCard from "@/components/ui/HolographicCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ShoppingCart, LayoutGrid, Search } from "lucide-react";

export default function MarketplacePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <ModulePage title="Marketplace" subtitle="Syncing trade nodes...">
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="neon-spinner"></div>
            </div>
        </ModulePage>
    );

    return (
        <ModulePage title="Marketplace" subtitle="Global Trade Exchange">
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="glass" size="sm" leftIcon={<LayoutGrid size={16} />}>Grid</Button>
                    <Button variant="glass" size="sm">Category</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.length === 0 ? (
                    <div className="col-span-full text-center py-20 opacity-50">
                        No assets found on the network.
                    </div>
                ) : (
                    products.map((product) => (
                        <HolographicCard key={product.id} title="" variant="glass" className="overflow-hidden group">
                            <Link href={`/buy/details?id=${product.id}`}>
                                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={product.image || "/placeholder.jpg"}
                                        alt={product.title}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-accent">
                                        ${product.price.toLocaleString()}
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
                                <p className="text-sm text-muted line-clamp-2 mb-4 h-10">{product.description}</p>
                                <Button variant="primary" className="w-full" leftIcon={<ShoppingCart size={16} />}>
                                    Buy Node
                                </Button>
                            </Link>
                        </HolographicCard>
                    ))
                )}
            </div>
        </ModulePage>
    );
}
