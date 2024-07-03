import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ProductFilterSection} from "../ProductFilterSection/ProductFilterSection";
import {FilterData, priceFilterSectionData, weightFilterSectionData} from "../ProductFilterSection/ProductFilterData";
import {useContext, useEffect, useState} from "react";
import {BrandApi} from "@/api/Product/Brand/BrandApi.ts";
import {TargetGroupApi} from "@/api/Product/TargetGroup/TargetGroupApi.ts";
import {ProductSectionContext} from "@/components/ProductSection/ProductSection.tsx";
import {SelectedFilters} from "@/components/SelectedFilters/SelectedFilters.tsx";

export function ProductFilter() {
    const contextValue = useContext(ProductSectionContext);

    if (!contextValue) throw new Error("ProductSectionContext is not provided");

    const { filters, setFilters, setPagination} = contextValue;

    const [brandFilters, setBrandFilters] = useState<FilterData[]>([]);
    const [targetGroupFilters, setTargetGroupFilters] = useState<FilterData[]>([]);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchData() {
            const result = await BrandApi.GetBrandListAsync(abortController.signal);
            setBrandFilters(result);
        }

        fetchData();

        return () => {
            abortController.abort();
        }
    }, [])

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchData() {
            const result = await TargetGroupApi.GetTargetGroupListAsync(abortController.signal);
            setTargetGroupFilters(result);
        }

        fetchData();

        return () => {
            abortController.abort();
        }
    }, [])

    function handleFilterChange(filterType: string, filterValue: string, checked: boolean) {
        setPagination({page: 1, pageSize: 10})
        setFilters(prevFilters => {
            const newFilters = {...prevFilters};
            if (checked) {
                newFilters[filterType].push(filterValue);
            } else {
                newFilters[filterType] = newFilters[filterType].filter(filterValue => filterValue !== filterValue);
            }

            return newFilters;
        })
    }

    function removeFilter(filterType: string, filterValue: string) {
        setFilters(prevFilters => {
            const newFilters = {...prevFilters};
            newFilters[filterType] = newFilters[filterType].filter(value => value !== filterValue);
            return newFilters;
        })
    }

    function resetFilters() {
        setPagination({page: 1, pageSize: 10})
        setFilters({
            price: [],
            brand: [],
            targetGroup: [],
            weight: []
        })
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                <div>
                    <Card className="border-none">
                        <CardHeader className="p-3 border-[#003cbf] border-2 bg-[#1b74e7] rounded-[6px]">
                            <CardTitle className="text-white font-bold">Bộ lọc sản phẩm</CardTitle>
                            <CardDescription className="text-white">Giúp bạn tìm sản phẩm nhanh hơn</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                {Object.values(filters).some(filter => filter.length > 0) && (
                    <div>
                        <SelectedFilters
                            filters={filters}
                            removeFilter={removeFilter}
                            resetFilters={resetFilters}
                        />
                    </div>
                )}
                <div>
                    <ProductFilterSection
                        data={priceFilterSectionData}
                        title="Chọn mức giá"
                        filterType="price"
                        onFilterChange={handleFilterChange}
                        filters={filters}
                    />
                </div>
                <div>
                    <ProductFilterSection
                        data={brandFilters}
                        title="Thương hiệu"
                        filterType="brand"
                        onFilterChange={handleFilterChange}
                        filters={filters}
                    />
                </div>
                <div>
                    <ProductFilterSection
                        data={targetGroupFilters}
                        title="Đối tượng"
                        filterType="targetGroup"
                        onFilterChange={handleFilterChange}
                        filters={filters}
                    />
                </div>
                <div>
                    <ProductFilterSection
                        data={weightFilterSectionData}
                        title="Trọng lượng"
                        filterType="weight"
                        onFilterChange={handleFilterChange}
                        filters={filters}
                    />
                </div>
            </div>
        </>
    )
}