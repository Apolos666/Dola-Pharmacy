import {TbSortDescendingLetters} from "react-icons/tb";
import {Button} from "@/components/ui/button.tsx";
import {ProductCard} from "@/components/ProductCard/ProductCard.tsx";
import {ProductPagination} from "@/components/ProductPagination/ProductPagination.tsx";
import {useEffect, useState} from "react";
import {ProductApi} from "@/api/Product/ProductApi.ts";
import {Product} from "@/components/ProductDisplay/ProductDisplayConfig.ts";

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
                <div className="text-lg flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <TbSortDescendingLetters className="h-full text-3xl"/>
                        <div>Xếp theo:</div>
                    </div>
                    <Button
                        className="text-white bg-[#003CBF] rounded-[8px] hover:bg-[#003CBF] hover:text-white">Tên
                        A-Z</Button>
                    <Button
                        className="text-[#003CBF] border-[#003CBF] border-[1px] bg-white rounded-[8px] hover:bg-[#003CBF] hover:text-white">Tên
                        Z-A</Button>
                    <Button
                        className="text-[#003CBF] border-[#003CBF] border-[1px] bg-white rounded-[8px] hover:bg-[#003CBF] hover:text-white">Giá
                        thấp đến cao</Button>
                    <Button
                        className="text-[#003CBF] border-[#003CBF] border-[1px] bg-white rounded-[8px] hover:bg-[#003CBF] hover:text-white">Giá
                        cao xuống thấp</Button>
                </div>
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