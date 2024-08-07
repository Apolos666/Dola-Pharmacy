import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Checkbox} from "../ui/checkbox";
import {FilterData} from "./ProductFilterData";
import {Filters} from "@/components/ProductSection/ProductSectionConfig.ts";

type ProductFilterSectionProps = {
    data: FilterData[],
    title: string,
    filterType: string,
    onFilterChange: (filterType: string, filterValue: string, checked: boolean) => void,
    filters: Filters
}

export function ProductFilterSection({data, title, filterType, onFilterChange, filters}: ProductFilterSectionProps) {
    return (
        <>
            <Card className="border-[#003cbf] border-2 rounded-[6px]">
                <CardHeader className="px-3 py-2 bg-[#003CBF] ">
                    <CardTitle className="text-white text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-3 px-3">
                    <div
                        className="flex flex-col gap-4 overflow-y-auto max-h-[200px] scrollbar scrollbar-thumb-blue-500 scrollbar-track-sky-300 scrollbar-w-1">
                        {data.map((filterData, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Checkbox
                                    className="rounded-[4px] data-[state=checked]:bg-[#0075FF] data-[state=checked]:border-none data-[state=checked]:text-white"
                                    id="terms"
                                    onCheckedChange={(e) => onFilterChange(filterType, filterData.filterValue, e as boolean)}
                                    checked={filters[filterType].includes(filterData.filterValue)}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {filterData.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}