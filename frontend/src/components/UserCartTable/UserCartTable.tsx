import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UpdateCartProductDto, useCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {useWindowSize} from "@/hooks/useWindowSize.tsx";

export function UserCartTable() {
    const {
        userCart,
        updateProductInCartAsync,
        removeProductFromCartAsync
    }  = useCart();

    const totalPrice = userCart?.cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0) || 0;

    async function HandleUpdateCartProduct(productId: string, quantity: number) {
        if (quantity <= 0)
            return;

        const data: UpdateCartProductDto = {
            productId: productId,
            quantity: quantity,
        }

        await updateProductInCartAsync(data);
    }

    const {width} = useWindowSize();

    return (
        <>
            {/* Desktop and Tablet */}
            {width >= 768 && (
                <div className="p-2 border-[1.5px] border-gray-300 rounded-[5px]">
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[1px] border-gray-200">
                                    <TableHead className="font-bold">Thông tin sản phẩm</TableHead>
                                    <TableHead className="font-bold">Đơn giá</TableHead>
                                    <TableHead className="font-bold">Số lượng</TableHead>
                                    <TableHead className="font-bold">Thành tiền</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="border-[1px] border-gray-200">
                                {userCart?.cartItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div
                                                className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                                <div className="w-[20%]">
                                                    <img className="w-full"
                                                         src={item.product.productImages[0].imageUrl}
                                                         alt=""/>
                                                </div>
                                                <div className="w-[80%]">
                                                    <div
                                                        className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all duration-300">
                                                        {item.product.productName}
                                                    </div>
                                                    <Button
                                                        className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                                        onClick={() => removeProductFromCartAsync(item.productId)}
                                                    >Xoá</Button>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            className="text-[#5dac46] font-bold">{item.product.price.toLocaleString()}₫</TableCell>
                                        <TableCell>
                                            <div
                                                className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                                <Button
                                                    size="none" variant="none"
                                                    className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                                    onClick={() => HandleUpdateCartProduct(item.productId, item.quantity - 1)}
                                                >-</Button>
                                                <div className="mx-3">{item.quantity}</div>
                                                <Button
                                                    size="none" variant="none"
                                                    className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                                    onClick={() => HandleUpdateCartProduct(item.productId, item.quantity + 1)}
                                                >+</Button>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            className="text-[#5dac46] font-bold">{(item.product.price * item.quantity).toLocaleString()}₫</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <div className="font-medium text-[15px]">Tổng tiền:</div>
                                <div className="text-[#5dac46] font-bold">{totalPrice.toLocaleString()}₫</div>
                            </div>
                            <Button variant="none"
                                    className="bg-[#1b74e7] hover:bg-[#003cbf] text-white rounded-[6px] transition-all px-28">Thanh
                                toán
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile */}
            {width < 768 && (
                <div className="p-2 border-[1.5px] border-gray-300 rounded-[5px]">
                    <div className="flex flex-col gap-4">
                        {userCart?.cartItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-6">
                                <div className="w-[25%]">
                                    <img src={item.product.productImages[0].imageUrl} alt=""/>
                                </div>
                                <div className="w-[75%]">
                                    <div className="text-[13px] font-medium">{item.product.productName}</div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <div
                                                className="flex items-center border-[1px] border-[#1b74e7]  p-1 rounded-[5px]">
                                                <Button
                                                    size="none" variant="none"
                                                    className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                                    onClick={() => HandleUpdateCartProduct(item.productId, item.quantity - 1)}
                                                >-</Button>
                                                <div className="mx-3">{item.quantity}</div>
                                                <Button
                                                    size="none" variant="none"
                                                    className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                                    onClick={() => HandleUpdateCartProduct(item.productId, item.quantity + 1)}
                                                >+</Button>
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className="text-[#5dac46] font-bold">{(item.product.price * item.quantity).toLocaleString()}₫
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold p-0 w-full flex justify-end"
                                                onClick={() => removeProductFromCartAsync(item.productId)}
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <div className="font-medium text-[15px]">Tổng tiền:</div>
                                <div className="text-[#1b74e7] font-bold">{totalPrice.toLocaleString()}₫</div>
                            </div>
                            <Button variant="none"
                                    className="bg-[#1b74e7] hover:bg-[#003cbf] text-white rounded-[6px] transition-all px-28">Thanh
                                toán
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}