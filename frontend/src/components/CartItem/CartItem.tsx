import {Button} from "@/components/ui/button.tsx";
import {Product} from "@/components/ProductDisplay/ProductDisplayConfig.ts";
import {CartContext, UpdateCartDto} from "@/contexts/Cart/CartProviderConfig.ts";
import {useContext} from "react";

type CartItemProps = {
    product: Product;
    quantity: number;
}

export function CartItem({product, quantity} : CartItemProps) {
    const {
        updateProductInCartAsync,
        removeProductFromCartAsync
    } = useContext(CartContext);

    async function handleUpdateProductQuantity(updateQuantity: number) {
        if (updateQuantity <= 0) {
            return;
        }

        const updateDto: UpdateCartDto = {
            productId: product.productId,
            quantity: updateQuantity
        }

        await updateProductInCartAsync(updateDto);
    }

    return (
        <>
            <div className="flex gap-3 border-b-[1px] border-b-gray-200 pb-4">
                <div className="w-[25%]">
                    <img className="w-full" src={product.productImages[0].imageUrl} alt=""/>
                </div>
                <div className="w-[75%]">
                    <div className="text-[13px] font-semibold text-left hover:text-[#1b74e7] transition-all">{product.productName}</div>
                    <Button
                        className="text-red-500 font-semibold flex justify-start p-0"
                        onClick={() => removeProductFromCartAsync(product.productId)}
                    >Xoá</Button>
                    <div className="flex items-center justify-between">
                        <div className="text-xs">Số lượng</div>
                        <div className="text-[#1b74e7] font-semibold">{(product.price * quantity).toLocaleString()}₫</div>
                    </div>
                    <div className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                        <Button
                            size="none" variant="none" className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                            onClick={() => handleUpdateProductQuantity(quantity - 1)}
                        >-</Button>
                        <div className="mx-3">{quantity}</div>
                        <Button
                            size="none" variant="none" className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                            onClick={() => handleUpdateProductQuantity(quantity + 1)}
                        >+</Button>
                    </div>
                </div>
            </div>
        </>
    )
}