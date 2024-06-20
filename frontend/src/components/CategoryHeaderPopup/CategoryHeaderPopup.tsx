import {
    Category,
    categoriesData,
    CategoryItemsData
} from "@/components/CategoryHeaderPopup/CategoryHeaderPopupConfig.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {MdKeyboardArrowRight} from "react-icons/md";
import {GetItemsElementBasedonCategory} from "@/components/CategoryHeaderPopup/CategoryHeaderPopupUtil.tsx";

export function CategoryHeaderPopup() {
    const [selectedCategory, setSelectedCategory] = useState<Category>(Category.DuocPham);

    const Items = GetItemsElementBasedonCategory(selectedCategory);

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-2">
                    {categoriesData.map((category, index) => (
                        <div key={index} className="relative">
                            <Button
                                onClick={() => setSelectedCategory(category)}
                                className={`
                                ${selectedCategory === category ? "bg-[#5DAC46] hover:bg-[#5DAC46]" : "bg-[#1B74E7] hover:bg-[#1B74E7]"} 
                                text-left w-full block transition-colors duration-500 text-white hover:text-white rounded-[8px]
                                `}
                            >{category}</Button>
                            <MdKeyboardArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 text-4xl text-white"/>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-4">
                    {Items}
                </div>
                <div>
                    {CategoryItemsData[selectedCategory].map((item, index) => (
                        <div key={index}>
                            <img src={item.src} alt=""/>
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}