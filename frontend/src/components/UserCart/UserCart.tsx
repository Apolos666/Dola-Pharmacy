import {HiOutlineShoppingBag} from "react-icons/hi2";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";

export function UserCart() {
    return (
        <>
            <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger className="flex items-center bg-[#003CBF] p-2 rounded-[10px] hover:bg-white group transition-colors duration-200 ease-in-out cursor-pointer">
                    <div className="text-white group-hover:text-[#003CBF] transition-colors duration-200 ease-in-out">Giỏ hàng</div>
                    <div className="relative">
                        <HiOutlineShoppingBag className="text-white text-4xl group-hover:text-[#003CBF] transition-colors duration-200 ease-in-out"/>
                        <span
                            className="absolute top-[-6px] right-[-2px] bg-[#5dac46] w-5 h-5 rounded-full text-white text-sm"
                        >8</span>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent align={"end"} sideOffset={10} className="bg-white border-2 border-[#003CBF] text-black rounded-[10px]">
                    The React Framework – created and maintained by @vercel.
                </HoverCardContent>
            </HoverCard>
        </>
    )
}