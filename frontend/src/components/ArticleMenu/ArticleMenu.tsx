import {Menu} from "@/components/HeaderMenu/HeaderMenuConfig.ts";
import {Dispatch, SetStateAction} from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FaChevronDown} from "react-icons/fa";
import {Link} from "react-router-dom";

type ArticleMenuProps = {
    menu: Menu;
    selectedMenu: Menu;
    setSelectedMenu: Dispatch<SetStateAction<Menu>>;
}

export function ArticleMenu({menu, selectedMenu, setSelectedMenu}: ArticleMenuProps) {
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
                <HoverCardContent align="start" sideOffset={15} className="bg-white rounded-[8px] p-2">
                    <div className="flex flex-col items-start gap-2">
                        <div>
                            <Link to="/" className="text-sm">
                                Góc dinh dưỡng
                            </Link>
                        </div>
                        <div>
                            <Link to="/" className="text-sm">
                                Góc khoẻ đẹp
                            </Link>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}