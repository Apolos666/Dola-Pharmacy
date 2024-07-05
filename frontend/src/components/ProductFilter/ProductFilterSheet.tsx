import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FaFilter} from "react-icons/fa";
import {ProductFilter} from "@/components/ProductFilter/ProductFilter.tsx";

export function ProductFilterSheet() {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="none" className="bg-[#1B74E7] shadow-button border-none rounded-l-[6px]">
                        <FaFilter className="text-white"/>
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-white overflow-y-auto">
                    <ProductFilter/>
                </SheetContent>
            </Sheet>
        </>
    )
}