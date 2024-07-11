import {HiOutlineShoppingBag} from "react-icons/hi2";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {CartItem} from "@/components/CartItem/CartItem.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {TiShoppingCart} from "react-icons/ti";
import {Link} from "react-router-dom";

export function UserCart() {
    const { userCart } = useCart();

    const totalPrice = userCart?.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0;
    const totalQuantity = userCart?.cartItems.reduce((total, item) => total + item.quantity, 0) || 0;

    return (
        <>
            <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger className="block bg-[#003CBF] p-2 rounded-[10px] hover:bg-white group transition-colors duration-200 ease-in-out cursor-pointer">
                    <Link to="/cart" className="flex items-center justify-between gap-2">
                        <div
                            className="xl:block hidden text-white group-hover:text-[#003CBF] transition-colors duration-200 ease-in-out">Giỏ hàng
                        </div>
                        <div className="relative">
                            <HiOutlineShoppingBag
                                className="text-white text-4xl group-hover:text-[#003CBF] transition-colors duration-200 ease-in-out"/>
                            <span
                                className="absolute top-[-6px] right-[-2px] bg-[#5dac46] w-5 h-5 rounded-full text-white text-sm"
                            >{totalQuantity}</span>
                        </div>
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent align={"end"} sideOffset={10}
                                  className="bg-white border-2 border-[#003CBF] text-black rounded-[10px] w-[340px] hidden md:block">
                    {userCart?.cartItems.length === 0 ? (
                        <>
                            <div className="flex flex-col items-center">
                                <TiShoppingCart className="text-3xl"/>
                                <div className="text-center py-4 text-sm">Không có sản phẩm nào trong giỏ hàng của bạn
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div
                                className="max-h-[350px] overflow-y-auto scrollbar scrollbar-w-1 scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded-full">
                                {userCart?.cartItems.map((item, index) => (
                                    <CartItem key={index} product={item.product} quantity={item.quantity}/>
                                ))}
                            </div>
                            <div className="flex items-center justify-between my-4">
                                <div className="font-medium">Tổng tiền:</div>
                                <div className="text-[#1b74e7] font-semibold">{totalPrice.toLocaleString()}₫</div>
                            </div>
                            <Link to="/checkout" className="block w-full">
                                <Button variant="none"
                                        className="bg-[#1b74e7] hover:bg-[#003cbf] text-white rounded-[10px] transition-all w-full">Thanh
                                    toán</Button>
                            </Link>
                        </div>
                    )}
                </HoverCardContent>
            </HoverCard>
        </>
    )
}