import 'react-phone-number-input/style.css'
import {DeliveryInformation} from "@/components/DeliveryInformation/DeliveryInformation.tsx";
import {ShippingMethod} from "@/components/ShippingMethod/ShippingMethod.tsx";
import {PaymentMethod} from "@/components/PaymentMethod/PaymentMethod.tsx";
import {ProductsCheckout} from "@/components/ProductCheckout/ProductsCheckout.tsx";

export function Checkout() {
    return (
        <>
            <div className="flex xl:flex-row flex-col md:mx-32 mx-4 gap-10">
                <div className="xl:w-[65%] w-full">
                    <div className="flex justify-center my-4">
                        <img src="/logo.webp" alt="" className="w-72"/>
                    </div>
                    <div className="grid xl:grid-cols-2 xl:gap-7 grid-cols-1 mt-2">
                        <DeliveryInformation/>
                        <div className="flex flex-col gap-4">
                            <ShippingMethod/>
                            <PaymentMethod/>
                        </div>
                    </div>
                    <div className="py-8"></div>
                </div>
                <div className="xl:w-[35%] w-full border-l-[#ddd] xl:border-l-2">
                    <ProductsCheckout />
                </div>
            </div>
        </>
    )
}