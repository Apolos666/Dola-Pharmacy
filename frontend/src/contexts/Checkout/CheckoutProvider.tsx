import {useAxiosPrivate} from "@/hooks/useAxiosPrivate.tsx";
import {AddOrderDto} from "@/model/OrderType.ts";
import {loadStripe} from "@stripe/stripe-js";
import {CheckoutContext} from "@/contexts/Checkout/CheckoutProviderConfig.ts";
import {ReactNode, useState} from "react";
import {useLoading} from "@/hooks/useLoading.tsx";

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function CheckoutProvider({children}: { children: ReactNode }) {
    const axiosPrivate = useAxiosPrivate();
    const {withLoading} = useLoading();

    const [order, setOrder] = useState<AddOrderDto>({
        CartItemsDto: [],
        Email: '',
        FullName: '',
        PhoneNumber: '',
        Address: '',
        Province: '',
        District: '',
        Ward: '',
        Note: '',
        ShippingMethodId: '',
        PaymentMethodId: '',
        CouponId: '',
    });

    async function AddOrderAsync(addOrder: AddOrderDto) {
        try {
            const response = await axiosPrivate.post("/order/create-order", {
                CartItemsDto: addOrder.CartItemsDto,
                Email: addOrder.Email,
                FullName: addOrder.FullName,
                PhoneNumber: addOrder.PhoneNumber,
                Address: addOrder.Address,
                Province: addOrder.Province,
                District: addOrder.District,
                Ward: addOrder.Ward,
                Note: addOrder.Note,
                ShippingMethodId: addOrder.ShippingMethodId,
                PaymentMethodId: addOrder.PaymentMethodId,
            });
            return response.data;
        } catch (exception) {
            console.error("Error: ", exception);
        }
    }

    async function HandleCheckoutAsync(addOrderDto: AddOrderDto | null) {
        if (addOrderDto) {
            await withLoading(async () => {
                const response = await AddOrderAsync(addOrderDto)
                stripe?.redirectToCheckout({sessionId: response})
            } );
        }
    }

    return (
        <CheckoutContext.Provider value={{order, setOrder, HandleCheckoutAsync}}>
            {children}
        </CheckoutContext.Provider>
    )
}