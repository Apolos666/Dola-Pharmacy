interface LineItem {
    ProductDescription: string;
    ProductPrice: number;
    ProductQuantity: number;
}

interface OrderSummaryProps {
    orderData: {
        LineItems: LineItem[];
    } | null;
    totalPrice: number | undefined;
    shippingFee: number | null;
}

export function OrderSummary({ orderData, totalPrice, shippingFee }: OrderSummaryProps) {
    return (
        <div className="bg-[#FAFAFA] rounded-[10px] p-4">
            <div className="text-[#333333] text-lg font-bold border-b-[1px] border-gray-300 pb-4">
                Đơn hàng của bạn
            </div>
            <div className="overflow-y-auto max-h-[250px]">
                {orderData?.LineItems.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between gap-4 my-2">
                            <div className="w-[70%] text-[#333333] text-base font-medium">{item.ProductDescription}</div>
                            <div className="w-[30%]">
                                <div className="text-[#5dac46] text-base font-bold">Giá: {item.ProductPrice}₫</div>
                                <div className="text-[#5dac46] text-base font-bold">Số lượng: {item.ProductQuantity}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pb-4 border-b-[1px] border-gray-300" />
            <div className="flex flex-col gap-2 py-2 border-b-[1px] border-gray-300">
                <div className="flex justify-between">
                    <div className="text-[#333333] text-base font-medium">
                        Tạm tính
                    </div>
                    <div className="text-[#2a9dcc] text-base font-bold">
                        {totalPrice?.toLocaleString()}₫
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="text-[#333333] text-base font-medium">
                        Phí vận chuyển
                    </div>
                    <div className="text-[#2a9dcc] text-base font-bold">
                        {shippingFee?.toLocaleString()}₫
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <div className="text-[#333333] text-base font-medium">
                    Tổng số tiền
                </div>
                <div className="text-[#2a9dcc] text-base font-bold">
                    {((totalPrice ?? 0) + (shippingFee ?? 0)).toLocaleString()}₫
                </div>
            </div>
        </div>
    );
}