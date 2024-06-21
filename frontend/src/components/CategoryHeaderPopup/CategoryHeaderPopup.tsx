import {
    Category,
    categoriesData,
    CategoryItemsData
} from "@/components/CategoryHeaderPopup/CategoryHeaderPopupConfig.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Card} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";

export function CategoryHeaderPopup() {
    const [selectedCategory, setSelectedCategory] = useState<Category>(Category.DuocPham);

    const categoryItems = CategoryItemsData[selectedCategory];

    return (
        <>
            <div className="flex gap-4">
                <div className="flex flex-col gap-3 xl:w-[25%] md:w-[30%]">
                    {categoriesData.map((category, index) => (
                        <div key={index} className="relative">
                            <Button
                                onClick={() => setSelectedCategory(category)}
                                className={`
                                ${selectedCategory === category ? "bg-[#5DAC46] hover:bg-[#5DAC46]" : "bg-[#1B74E7] hover:bg-[#1B74E7]"} 
                                text-left w-full block transition-colors duration-500 text-white hover:text-white rounded-[8px] text-wrap
                                `}
                            >{category}</Button>
                            <MdKeyboardArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 text-4xl text-white"/>
                        </div>
                    ))}
                </div>
                <div className="grid xl:grid-cols-4 xl:grid-rows-5 md:grid-cols-2 md:grid-rows-6 xl:w-[75%] md:w-[70%] gap-4">
                    {categoryItems.map((item, index) => (
                        <Card key={index} className="shadow hover:shadow-[#003CBF] transition-shadow duration-200 group rounded-[8px]">
                            <Link to="/" className="flex items-center">
                                <img className="h-16 w-16  group-hover:h-[68px] group-hover:w-[68px] transition-all duration-200" src={item.src} alt=""/>
                                <p className="text-sm font-thin px-2 text-[#231f20] group-hover:text-[#003CBF] transition-colors duration-200">{item.title}</p>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}