import {productTypeResponse, productTypesWithChildrenResponse} from "@/model/ProductType.ts";
import {useEffect, useState} from "react";
import {ProductTypeApi} from "@/api/Product/ProductType/ProductTypeApi.ts";

export function useProductType(productTypeNameNormalized?: string | undefined) {
    const [productType, setProductType] = useState<productTypeResponse | null>(null);
    const [productTypeWithChildren, setProductTypeWithChildren] = useState<productTypesWithChildrenResponse[] | null>(null);

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

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchProductTypeWithChildren() {
            const productTypesWithChildren = await ProductTypeApi.GetAllProductTypesWithChildren(abortController.signal);
            setProductTypeWithChildren(productTypesWithChildren);
        }

        fetchProductTypeWithChildren();

        return () => {
            abortController.abort();
        }
    }, []);

    return { productType, productTypeWithChildren };
}