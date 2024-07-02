import {ProductCard} from "@/components/ProductCard/ProductCard.tsx";
import {ProductPagination} from "@/components/ProductPagination/ProductPagination.tsx";
import {useEffect, useState} from "react";
import {ProductApi} from "@/api/Product/ProductApi.ts";
import {Product} from "@/components/ProductDisplay/ProductDisplayConfig.ts";
import {SortProductButtons} from "@/components/SortProductButtons/SortProductButtons.tsx";

export function ProductDisplay() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchData() {
            const result = await ProductApi.GetProductsAsync("", abortController.signal);
            setProducts(result.items)
        }

        fetchData();

        return () => {
            abortController.abort();
        }
    }, [])

    return (
        <>
            <div className="font-bold text-3xl">Tất cả sản phẩm</div>
            <div className="my-4">
                <SortProductButtons/>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {products.map((product, index) => {
                    return (
                        <ProductCard key={index} product={product}/>
                    )
                })}
            </div>
            <div className="my-8">
                <ProductPagination/>
            </div>
        </>
    )
}