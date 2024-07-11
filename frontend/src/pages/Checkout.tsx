import 'react-phone-number-input/style.css'
import {DeliveryInformation} from "@/components/DeliveryInformation/DeliveryInformation.tsx";
import {ShippingMethod} from "@/components/ShippingMethod/ShippingMethod.tsx";
import {PaymentMethod} from "@/components/PaymentMethod/PaymentMethod.tsx";
import {ProductsCheckout} from "@/components/ProductCheckout/ProductsCheckout.tsx";

export function Checkout() {
    return (
        <>
            <div className="flex mx-32 gap-10">
                <div className="w-[65%]">
                    <div className="flex justify-center my-4">
                        <img src="/logo.webp" alt="" className="w-72"/>
                    </div>
                    <div className="grid grid-cols-2 gap-7 mt-2">
                        <DeliveryInformation/>
                        <div className="flex flex-col gap-4">
                            <ShippingMethod/>
                            <PaymentMethod/>
                        </div>
                    </div>
                    <div className="py-8"></div>
                </div>
                <div className="w-[35%] border-l-[#ddd] border-l-2">
                    <ProductsCheckout />
                </div>
            </div>
        </>
    )
}