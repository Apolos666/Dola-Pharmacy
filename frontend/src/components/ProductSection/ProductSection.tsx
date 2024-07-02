import {ProductDisplay} from "@/components/ProductDisplay/ProductDisplay.tsx";
import {ProductFilter} from "@/components/ProductFilter/ProductFilter.tsx";
import {createContext, useState} from "react";
import {Pagination, ProductSectionContextType, Sorting} from "@/components/ProductSection/ProductSectionConfig.ts";

export const ProductSectionContext = createContext<ProductSectionContextType | undefined>(undefined);

export function ProductSection() {
    const [filters, setFilters] = useState<ProductSectionContextType['filters']>({
        price: [],
        brand: [],
        targetGroup: [],
        weight: []
    });

    const [sort, setSort] = useState<Sorting>({ column: "price", order: "desc" });
    const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10 });

    function buildQueryParams() {
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

        params.append('SortColumn', sort.column);
        params.append('SortOrder', sort.order);
        params.append('Page', pagination.page.toString());
        params.append('PageSize', pagination.pageSize.toString());

        return params.toString();
    }

    return (
        <>
            <ProductSectionContext.Provider value={{filters ,setFilters, sort, setSort, pagination, setPagination, buildQueryParams}}>
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