import {ProductDisplay} from "@/components/ProductDisplay/ProductDisplay.tsx";
import {ProductFilter} from "@/components/ProductFilter/ProductFilter.tsx";

export function ProductSection() {

    return (
        <>
            <div className="flex justify-between gap-10 w-full mt-4">
                <div className="w-[30%]">
                    <ProductFilter />
                </div>
                <div className="w-[70%]">
                    <ProductDisplay />
                </div>
            </div>
        </>
    )
}