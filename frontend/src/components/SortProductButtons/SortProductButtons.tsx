import {useContext, useState} from "react";
import {ProductSectionContext} from "@/components/ProductSection/ProductSection.tsx";
import {TbSortDescendingLetters} from "react-icons/tb";
import {Button} from "@/components/ui/button.tsx";

export function SortProductButtons() {
    const context = useContext(ProductSectionContext);

    if (!context) throw new Error("ProductSectionContext is not provided");

    const {setSort} = context;

    const [selectedButton, setSelectedButton] = useState<string | null>('Tên Z-A');

    return (
        <>
            <div className="text-lg flex items-center gap-3 w-full overflow-x-auto">
                <div className="flex items-center gap-2">
                    <TbSortDescendingLetters className="h-full text-3xl"/>
                    <div className="text-nowrap">Xếp theo:</div>
                </div>
                <Button
                    className={`text-white ${selectedButton === 'Tên Z-A' ? 'bg-[#003CBF] text-white' : 'bg-white text-[#003CBF] border-[1px] border-[#003CBF]'} rounded-[8px] hover:bg-[#003CBF] hover:text-white`}
                    onClick={() => {
                        setSelectedButton("Tên Z-A");
                        setSort({column: "productname", order: "desc"})
                    }}
                >
                    Tên Z-A
                </Button>
                <Button
                    className={`${selectedButton === 'Tên A-Z' ? 'bg-[#003CBF] text-white' : 'bg-white text-[#003CBF] border-[1px] border-[#003CBF]'} rounded-[8px] hover:bg-[#003CBF] hover:text-white`}
                    onClick={() => {
                        setSelectedButton("Tên A-Z");
                        setSort({column: "productname", order: "asc"})
                    }}
                >
                    Tên A-Z
                </Button>
                <Button
                    className={`text-white ${selectedButton === 'Giá thấp đến cao' ? 'bg-[#003CBF] text-white' : 'bg-white text-[#003CBF] border-[1px] border-[#003CBF]'} rounded-[8px] hover:bg-[#003CBF] hover:text-white`}
                    onClick={() => {
                        setSelectedButton("Giá thấp đến cao");
                        setSort({column: "price", order: "asc"})
                    }}
                >
                    Giá thấp đến cao
                </Button>
                <Button
                    className={`text-white ${selectedButton === 'Giá cao xuống thấp' ? 'bg-[#003CBF] text-white' : 'bg-white text-[#003CBF] border-[1px] border-[#003CBF]'} rounded-[8px] hover:bg-[#003CBF] hover:text-white`}
                    onClick={() => {
                        setSelectedButton("Giá cao xuống thấp");
                        setSort({column: "price", order: "desc"})
                    }}
                >
                    Giá cao xuống thấp
                </Button>
            </div>
        </>
    )
}