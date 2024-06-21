import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Menu} from "@/components/HeaderMenu/HeaderMenuConfig.ts";
import {Dispatch, SetStateAction} from "react";
import {FaChevronDown} from "react-icons/fa";
import {Link} from "react-router-dom";
import {categoriesData, CategoryItemsData} from "@/components/CategoryHeaderPopup/CategoryHeaderPopupConfig.ts";

type ProductCategoryMenuProps = {
    menu: Menu;
    selectedMenu: Menu;
    setSelectedMenu: Dispatch<SetStateAction<Menu>>;
}

export function ProductCategoryMenu({menu, selectedMenu, setSelectedMenu}: ProductCategoryMenuProps) {
    return (
        <div className="group">
            <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger>
                    <Button
                        onClick={() => setSelectedMenu(menu)}
                        className={`
                            ${selectedMenu === menu ?
                            "text-[#5dac46] bg-white group-hover:text-[#5dac46] group-hover:bg-white" :
                            "text-white group-hover:text-[#5dac46] group-hover:bg-white"}
                            rounded-[8px] font-semibold
                            `}
                    >
                        {menu}
                        <FaChevronDown
                            className="ml-2 transform group-hover:rotate-180 transition-transform duration-200"/>
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent align="center" sideOffset={15} className="bg-white rounded-[8px] p-4 w-[1000px]">
                    <div className="grid grid-cols-4 text-left gap-8 h-[500px]
                                        overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 scrollbar-track-white">
                        {categoriesData.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <Link to="/">
                                    <div className="text-[#1b74e7] font-bold mb-2">
                                        {category}
                                    </div>
                                </Link>
                                <div className="flex flex-col">
                                    {CategoryItemsData[category].map((item, itemIndex) => (
                                        <Link key={itemIndex} to="/" className="text-[#231f20]">{item.title}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}