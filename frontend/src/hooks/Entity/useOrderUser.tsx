import {useAxiosPrivate} from "@/hooks/useAxiosPrivate.tsx";
import {AddOrderDto} from "@/model/OrderType.ts";
import {UserCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {loadStripe} from "@stripe/stripe-js";

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function useOrderUser() {
    const axiosPrivate = useAxiosPrivate();

    async function AddOrderAsync(addOrder: AddOrderDto) {
        try {
            const response = await axiosPrivate.post("/order/create-order", {
                CartItemsDto: addOrder.CartItemsDto
            });
            return response.data;
        } catch (exception) {
            console.error("Error: ", exception);
        }
    }

    async function HandleCheckoutAsync(userCart: UserCart | null) {
        if (userCart) {
            const addOrderDto: AddOrderDto = {
                CartItemsDto: userCart.cartItems.map(item => {
                        return {
                            CartId: item.cartId,
                            ProductId: item.productId,
                            Quantity: item.quantity
                        }
                    }
                )
            }

            const response = await AddOrderAsync(addOrderDto);
            stripe?.redirectToCheckout({sessionId: response});
        }
    }

    return {
        AddOrderAsync,
        HandleCheckoutAsync
    }
}