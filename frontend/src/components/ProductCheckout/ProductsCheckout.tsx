import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {Link} from "react-router-dom";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {useOrderUser} from "@/hooks/Entity/useOrderUser.tsx";

export function ProductsCheckout() {
    const {userCart} = useCart();
    const {HandleCheckoutAsync} = useOrderUser();

    const totalPrices = userCart?.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0;

    return (
        <>
            <div className="font-bold text-xl py-4 xl:pl-8 pl-0 border-b-2 border-b-[#ddd]">Đơn
                hàng <span>({userCart?.cartItems.length} sản phẩm)</span>
            </div>
            <div className="py-3 xl:pl-8 pl-0">
                <div className="flex flex-col max-h-[320px] overflow-y-auto">
                    {userCart?.cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4">
                            <div className="w-[15%] relative">
                                <img className="w-full" src={item.product.productImages[0].imageUrl} alt=""/>
                                <span
                                    className="absolute top-0 right-0 bg-[#2a9dcc] text-white w-5 text-center h-5 text-sm rounded-full">{item.quantity}</span>
                            </div>
                            <div className="w-[85%]">
                                <div className="text-sm font-semibold text-[#333] mb-1">{item.product.productName}</div>
                                <div
                                    className="text-sm text-[#5dac46] font-bold">{(item.product.price * item.quantity).toLocaleString()}₫
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4 py-4 border-b-[1px] border-b-[#d9d9d9]">
                    <Input className="border-[#d9d9d9] text-[#333] rounded-[4px]" placeholder="Nhập mã giảm giá"/>
                    <Button size="none" variant="none"
                            className="bg-[#2f71a9] h-full text-white py-3 px-6 rounded-[4px]" disabled={true}>Áp
                        dụng</Button>
                </div>
            </div>
            <div className="py-3 xl:pl-8 pl-0">
                <div className="flex items-center justify-between w-full mb-2">
                    <div className="font-medium">Tạm tính</div>
                    <div className="text-[#5dac46] font-bold">{totalPrices.toLocaleString()}₫</div>
                </div>
                <div className="flex items-center justify-between w-full pb-6 border-b-[1px] border-b-[#d9d9d9]">
                    <div className="font-medium">Phí vận chuyển</div>
                    <div className="text-[#5dac46] font-bold">{(40000).toLocaleString()}₫</div>
                </div>
            </div>
            <div className="py-1 xl:pl-8 pl-0">
                <div className="flex items-center justify-between w-full">
                    <div className="font-medium">Tổng cộng</div>
                    <div className="text-[#2a9dcc] text-xl font-bold">{(totalPrices + 40000).toLocaleString()}₫</div>
                </div>
                <div className="flex xl:flex-row flex-col-reverse items-start w-full mt-4">
                    <Link to="/cart" className="font-medium text-[#2a9dcc] w-full flex justify-center my-4 xl:my-0 xl:justify-start "><MdOutlineKeyboardArrowLeft className="inline text-xl"/> Quay về giỏ hàng</Link>
                    <Button
                        size="none" variant="none"
                        className="bg-[#2f71a9] h-full w-full text-white py-3 px-8 rounded-[4px]"
                        onClick={() => HandleCheckoutAsync(userCart)}
                    >Đặt hàng</Button>
                </div>
            </div>
        </>
    )
}