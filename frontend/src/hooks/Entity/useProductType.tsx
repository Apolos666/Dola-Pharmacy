import {productTypeResponse} from "@/model/ProductType.ts";
import {useEffect, useState} from "react";
import {ProductTypeApi} from "@/api/Product/ProductType/ProductTypeApi.ts";

export function useProductType(productTypeNameNormalized: string | undefined) {
    const [productType, setProductType] = useState<productTypeResponse | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchProductType() {
            if (!productTypeNameNormalized) return;

            const productType = await ProductTypeApi.GetProductTypeByTypeNameNormalized(productTypeNameNormalized, abortController.signal);
            setProductType(productType);
        }

        fetchProductType();

        return () => {
            abortController.abort();
        }
    }, [productTypeNameNormalized]);

    return productType;
}