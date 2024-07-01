import {ProductDisplay} from "@/components/ProductDisplay/ProductDisplay.tsx";
import {ProductFilter} from "@/components/ProductFilter/ProductFilter.tsx";
import {createContext, useEffect, useState} from "react";
import {ProductSectionContextType} from "@/components/ProductSection/ProductSectionConfig.ts";

export const ProductSectionContext = createContext<ProductSectionContextType | undefined>(undefined);

export function ProductSection() {
    const [filters, setFilters] = useState<ProductSectionContextType['filters']>({
        price: [],
        brand: [],
        targetGroup: [],
        weight: []
    });

    function BuildQueryParams() {
        const params = new URLSearchParams();

        if (filters.price.length > 0) {
            params.append('FilterPrice', 'true');
            params.append('FilterPriceValue', filters.price.join("Or"));
        }

        if (filters.brand.length > 0) {
            params.append('FilterBrand', 'true');
            params.append('FilterBrandValue', filters.brand.join("Or"));
        }

        if (filters.targetGroup.length > 0) {
            params.append('FilterTargetGroup', 'true');
            params.append('FilterTargetGroupValue', filters.targetGroup.join("Or"));
        }

        if (filters.weight.length > 0) {
            params.append('FilterWeight', 'true');
            params.append('FilterWeightValue', filters.weight.join("Or"));
        }

        return params.toString();
    }

    useEffect(() => {
        const query = BuildQueryParams();
        console.log(query)
    }, [filters])

    return (
        <>
            <ProductSectionContext.Provider value={{filters ,setFilters}}>
                <div className="flex justify-between gap-10 w-full mt-4">
                    <div className="w-[30%]">
                        <ProductFilter />
                    </div>
                    <div className="w-[70%]">
                        <ProductDisplay />
                    </div>
                </div>
            </ProductSectionContext.Provider>
        </>
    )
}