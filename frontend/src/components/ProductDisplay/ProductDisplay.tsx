import {ProductCard} from "@/components/ProductCard/ProductCard.tsx";
import {ProductPagination} from "@/components/ProductPagination/ProductPagination.tsx";
import {useContext, useEffect, useState} from "react";
import {ProductApi} from "@/api/Product/ProductApi.ts";
import {Product} from "@/components/ProductDisplay/ProductDisplayConfig.ts";
import {SortProductButtons} from "@/components/SortProductButtons/SortProductButtons.tsx";
import {ProductSectionContext} from "@/components/ProductSection/ProductSection.tsx";


export function ProductDisplay() {
    const context = useContext(ProductSectionContext)

    if (!context) throw new Error("ProductSectionContext is not provided");

    const { sort, pagination, filters , buildQueryParams} = context;

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchData() {
            const result = await ProductApi.GetProductsAsync(buildQueryParams(), abortController.signal);
            setProducts(result.items)
        }

        fetchData();

        return () => {
            abortController.abort();
        }
    }, [filters, sort, pagination])

    return (
        <>
            <div className="font-bold text-3xl">Tất cả sản phẩm</div>
            <div className="my-4">
                <SortProductButtons/>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {products.length > 0 ? (products.map((product, index) => {
                    return (
                        <ProductCard key={index} product={product}/>
                    )
                })) : (
                    <div className="text-[#856404] bg-[#fff3cd] col-span-4 py-3 px-6">Không có sản phẩm nào trong danh mục này.</div>
                )}
            </div>
            <div className="my-8">
                <ProductPagination/>
            </div>
        </>
    )
}