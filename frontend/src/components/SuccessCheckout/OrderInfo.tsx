interface OrderInfoProps {
    orderData: {
        FullName?: string;
        PhoneNumber?: string;
        Address?: string;
        Province?: string;
        District?: string;
        Ward?: string;
        OrderDate?: string;
        DeliveryTime?: string;
    } | null;
    profile: {
        email?: string;
    } | null;
}

export function OrderInfo({ orderData, profile }: OrderInfoProps) {
    return (
        <div className="rounded-[10px] p-4 grid grid-cols-2 grid-rows-2 gap-4 mt-4 bg-[#FAFAFA]">
            <div className="flex flex-col gap-2">
                <div className="text-[#333333] text-lg font-bold">
                    Thông tin mua hàng
                </div>
                <div className="text-[#333333] text-sm font-base">
                    {orderData?.FullName}
                </div>
                <div className="text-[#333333] text-sm font-base">
                    {profile?.email}
                </div>
                <div className="text-[#333333] text-sm font-base">
                    {orderData?.PhoneNumber}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-[#333333] text-lg font-bold">
                    Địa chỉ nhận hàng
                </div>
                <div className="text-[#333333] text-sm font-base">
                    {orderData?.Address}
                </div>
                <div className="text-[#333333] text-sm font-base">
                    {orderData?.Province}, {orderData?.District}, {orderData?.Ward}
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <div className="text-[#333333] text-lg font-bold">
                    Thời gian giao hàng
                </div>
                <div className="text-[#333333] text-sm font-base">
                    Ngày giao: {orderData?.OrderDate}
                </div>
                <div className="text-[#333333] text-sm font-base">
                    Thời gian giao: {orderData?.DeliveryTime}
                </div>
            </div>
        </div>
    );
}