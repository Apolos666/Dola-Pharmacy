import {Button} from "@/components/ui/button.tsx";
import {MdClose} from "react-icons/md";
import {FaRegCircleCheck} from "react-icons/fa6";
import {Product} from "@/components/ProductDisplay/ProductDisplayConfig.ts";
import {useCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {Link} from "react-router-dom";

type ProductCartPopupProps = {
    selectedProduct: Product | null;
    closePopup: () => void;
}

export function ProductCartPopup({selectedProduct, closePopup}: ProductCartPopupProps) {
    const {userCart} = useCart();

    const cartProductQuantity = userCart?.cartItems.reduce((total, item) => total + item.quantity, 0) || 0;

    return (
        <>
            <div
                onClick={closePopup}
                className="fixed top-0 left-0 z-10 opacity-50 w-full h-screen bg-[#363636]"
            >
            </div>
            <div
                className="fixed top-1/2 md:left-1/2 md:-translate-x-1/2 md:mx-0 mx-4 -translate-y-1/2 z-50 max-w-[450px] rounded-[7px] border-[1px] border-[#1b74e7]">
                <div
                    className="flex items-center justify-between bg-[#1b74e7] rounded-t-[7px] text-white px-3 py-2">
                    <div className="flex items-center">
                        <FaRegCircleCheck className="text-xl"/>
                        <div className="font-semibold ml-2">Mua hàng thành công</div>
                    </div>
                    <Button
                        variant="none"
                        size="none"
                        onClick={closePopup}
                    >
                        <MdClose className="text-2xl"/>
                    </Button>
                </div>
                <div className="flex items-center gap-2 px-2 bg-white py-5 border-b-[#1b74e7] border-b-[1px]">
                    <div className="w-[20%] flex justify-center">
                        <img className="w-[70px]" src={selectedProduct?.productImages[0].imageUrl} alt=""/>
                    </div>
                    <div className="w-[80%]">
                        <div className="font-bold text-sm">{selectedProduct?.productName}
                        </div>
                        <div className="font-semibold text-[#5dac46]">{selectedProduct?.price.toLocaleString()}₫</div>
                    </div>
                </div>
                <div>
                    <div className="px-3 py-2 bg-white rounded-b-[7px]">
                        <div className="text-sm font-medium mb-2">Giỏ hàng của bạn hiện có <span
                            className="text-[#1b74e7]">{cartProductQuantity}</span> sản phẩm
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="none" size="none"
                                className="bg-[#003cbf] text-white px-2 py-3 rounded-[5px]"
                                onClick={closePopup}
                            >Tiếp tục mua hàng
                            </Button>
                            <Link to="/checkout" className="block w-full">
                                <Button
                                    variant="none"
                                    size="none"
                                    className="bg-[#1b74e7] text-white px-2 py-3 rounded-[5px] w-full"
                                >Thanh toán ngay
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}