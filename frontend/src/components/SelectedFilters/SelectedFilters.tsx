import {CgClose} from "react-icons/cg";
import {Filters} from "@/components/ProductSection/ProductSectionConfig.ts";

type SelectedFiltersProps = {
    filters: Filters
    resetFilters: () => void
    removeFilter: (key: string, value: string) => void
}

export function SelectedFilters({filters, resetFilters, removeFilter} : SelectedFiltersProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg">Bạn chọn</div>
                <button
                    className="flex items-center w-20 gap-1 border-[1px] border-black p-1 rounded-[8px]"
                    onClick={resetFilters}
                >
                    <div>Bỏ hết</div>
                    <div><CgClose className="h-full"/></div>
                </button>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                        return value.map((filterValue, index) => (
                            <button
                                key={index}
                                className="flex items-center gap-1 py-1 px-2 rounded-[8px] bg-[#1B74E7] text-white"
                                onClick={() => removeFilter(key, filterValue)}
                            >
                                <div><CgClose className="h-full"/></div>
                                <div>{filterValue}</div>
                            </button>
                        ))
                    })}
                </div>
            </div>
        </>
    )
}