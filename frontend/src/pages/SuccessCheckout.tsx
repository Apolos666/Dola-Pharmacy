import axios from "@/api/Base/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa";
import { SuccessMessage } from "@/components/SuccessCheckout/SucessMessage";
import { OrderInfo } from "@/components/SuccessCheckout/OrderInfo";
import { OrderSummary } from "@/components/SuccessCheckout/OrderSummary";

interface OrderData {
    Address: string;
    CouponId: string;
    DeliveryTime: string;
    District: string;
    Email: string;
    FullName: string;
    Note: string;
    OrderDate: string;
    PaymentMethodId: string;
    PhoneNumber: string;
    Province: string;
    ShippingMethodId: string;
    UserId: string;
    Ward: string;
    LineItems: {
        ProductDescription: string;
        ProductPrice: number;
        ProductQuantity: number;
    }[];
}

export function SuccessCheckout() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [shippingFee, setShippingFee] = useState<number | null>(null);
    const { profile } = useAuth();

    useEffect(() => {
        async function fetchData() {
            if (sessionId) {
                const response = await axios.get(`/order/session/${sessionId}`);
                setOrderData({
                    ...response.data.metadata,
                    LineItems: response.data.line_items.data
                        .filter(item => item.description !== "Shipping Fee")
                        .map(item => ({
                            ProductDescription: item.description,
                            ProductPrice: item.price.unit_amount,
                            ProductQuantity: item.quantity,
                        })),
                });
                setShippingFee(response.data.line_items.data.find(item => item.description === "Shipping Fee")?.price.unit_amount);
            }
        }

        fetchData();
    }, [location.search, sessionId]);

    const totalPrice = orderData?.LineItems.reduce((acc, item) => acc + item.ProductPrice * item.ProductQuantity, 0);


    return (
        <div className="bg-[#E6E8EA] min-h-screen">
            <div className="flex justify-center items-center">
                <img
                    width={270}
                    height={270}
                    className="my-8"
                    src="/logo.webp"
                    alt=""
                />
            </div>
            <div className="container-app flex gap-4">
                <div className="w-[50%]">
                    <SuccessMessage />
                    <OrderInfo orderData={orderData} profile={profile ?? null} />
                </div>
                <div className="w-[50%]">
                    <OrderSummary orderData={orderData} totalPrice={totalPrice} shippingFee={shippingFee} />
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <Button 
                    size={'none'} 
                    variant={'none'} 
                    className="bg-[#357EBD] text-white px-8 py-5 rounded-[10px] hover:bg-[#2b6daa] mr-4" 
                >
                    Tiếp tục mua hàng
                </Button>
                <Button 
                    size={'none'} 
                    variant={'none'} 
                >
                    <FaPrint className="w-8 h-8 text-[#2a9dcc]" />
                    <div className="text-[#2a9dcc] text-xl font-bold ml-2">In hóa đơn</div>
                </Button>
            </div>
        </div>
    );
}
