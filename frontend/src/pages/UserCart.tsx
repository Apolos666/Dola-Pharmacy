import {UserCartTable} from "@/components/UserCartTable/UserCartTable.tsx";
import {UserCartDate} from "@/components/UserCartDate/UserCartDate.tsx";
import {useCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {BsBagX} from "react-icons/bs";

export function UserCart() {
    const {userCart} = useCart();

    return (
        <>
            <div className="container-app">
                <div className="h-[157px] bg-orange-300">Place Holder</div>
                {userCart?.cartItems.length !== 0 ? (
                    <div className="my-4">
                        <div className="flex gap-6">
                            <div className="w-[75%]">
                                <UserCartTable/>
                            </div>
                            <div className="w-[25%]">
                                <UserCartDate/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center my-4 border-2 rounded-[6px]">
                        <div className="flex justify-center mt-6">
                            <BsBagX className="text-[80px]"/>
                        </div>
                        <div className="text-sm my-6 font-medium">Không có sản phẩm nào trong giỏ hàng của bạn</div>
                    </div>
                )}
            </div>
        </>
    )
}