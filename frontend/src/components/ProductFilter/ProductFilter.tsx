import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ProductFilterSection} from "../ProductFilterSection/ProductFilterSection";
import {FilterData, priceFilterSectionData, weightFilterSectionData} from "../ProductFilterSection/ProductFilterData";
import {useEffect, useState} from "react";
import {BrandApi} from "@/api/Product/Brand/BrandApi.ts";
import {TargetGroupApi} from "@/api/Product/TargetGroup/TargetGroupApi.ts";

export function ProductFilter() {
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
                <div>
                    <ProductFilterSection data={priceFilterSectionData} title="Chọn mức giá"/>
                </div>
                <div>
                    <ProductFilterSection data={brandFilters} title="Thương hiệu"/>
                </div>
                <div>
                    <ProductFilterSection data={targetGroupFilters} title="Đối tượng"/>
                </div>
                <div>
                    <ProductFilterSection data={weightFilterSectionData} title="Trọng lượng"/>
                </div>
            </div>
        </>
    )
}