import { ProductCard } from "@/components/ProductCard/ProductCard.tsx";
import { ProductPagination } from "@/components/ProductPagination/ProductPagination.tsx";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { ProductApi } from "@/api/Product/ProductApi.ts";
import { SortProductButtons } from "@/components/SortProductButtons/SortProductButtons.tsx";
import { ProductSectionContext } from "@/components/ProductSection/ProductSectionContext.ts";
import { ProductCartPopup } from "@/components/ProductCartPopup/ProductCartPopup.tsx";
import { Product } from "@/components/ProductDisplay/ProductDisplayConfig.ts";

export function ProductDisplay() {
    const {
        productTypeNameNormalized,
        sort,
        pagination,
        filters,
        buildQueryParams,
        setTotalCount,
    } = useContext(ProductSectionContext);

    const [products, setProducts] = useState<Product[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const closePopup = useCallback(() => {
        setIsPopupVisible(false);
        setSelectedProduct(null);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const result = await ProductApi.GetProductsAsync(buildQueryParams(), abortController.signal);
                setTotalCount(result.totalCount);
                setProducts(result.items);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error('Error fetching products:', error);
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [filters, sort, pagination, productTypeNameNormalized, buildQueryParams, setTotalCount]);

    const renderProducts = useMemo(() => {
        if (products.length === 0) {
            return (
                <div className="text-[#856404] bg-[#fff3cd] col-span-4 py-3 px-6">
                    Không có sản phẩm nào trong danh mục này.
                </div>
            );
        }

        return products.map((product, index) => (
            <ProductCard
                key={index}
                product={product}
                setIsPopupVisible={setIsPopupVisible}
                setSelectedProduct={setSelectedProduct}
            />
        ));
    }, [products]);

    return (
        <>
            {isPopupVisible && <ProductCartPopup selectedProduct={selectedProduct} closePopup={closePopup} />}
            <div className="font-bold text-3xl">Tất cả sản phẩm</div>
            <div className="my-4">
                <SortProductButtons />
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                {renderProducts}
            </div>
            <div className="my-8">
                <ProductPagination />
            </div>
        </>
    );
}
