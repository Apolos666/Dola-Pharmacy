import {HiOutlineShoppingBag} from "react-icons/hi2";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {CartItem} from "@/components/CartItem/CartItem.tsx";
import {Button} from "@/components/ui/button.tsx";

export function UserCart() {
    return (
        <>
            <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger className="flex items-center bg-[#003CBF] p-2 rounded-[10px] hover:bg-white group transition-colors duration-200 ease-in-out cursor-pointer">
                    <div className="xl:block hidden text-white group-hover:text-[#003CBF] transition-colors duration-200 ease-in-out">Giỏ hàng</div>
                    <div className="relative">
                        <HiOutlineShoppingBag className="text-white text-4xl group-hover:text-[#003CBF] transition-colors duration-200 ease-in-out"/>
                        <span
                            className="absolute top-[-6px] right-[-2px] bg-[#5dac46] w-5 h-5 rounded-full text-white text-sm"
                        >8</span>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent align={"end"} sideOffset={10} className="bg-white border-2 border-[#003CBF] text-black rounded-[10px] w-[340px]">
                    <div className="flex flex-col gap-4">
                        <CartItem />
                        <CartItem />
                        <div className="flex items-center justify-between my-4">
                            <div className="font-medium">Tổng tiền:</div>
                            <div className="text-[#1b74e7] font-semibold">2.218.000₫</div>
                        </div>
                        <Button variant="none" className="bg-[#1b74e7] hover:bg-[#003cbf] text-white rounded-[10px] transition-all">Thanh toán</Button>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </>
    )
}