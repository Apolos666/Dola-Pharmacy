import {useAxiosPrivate} from "@/hooks/useAxiosPrivate.tsx";
import {AddCartDto, CartContext, CartItem, UserCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {BadRequestError, SystemError, UnknownError} from "@/api/Exception/ApiErrorException.ts";

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const axiosPrivate = useAxiosPrivate();
    const [userCart, setUserCart] = useState<UserCart | null>(null);

    const getUserCartAsync = useCallback(async () => {
        try {
            const result = await axiosPrivate.get("/cart/get-user-cart");
            const userCart: UserCart = {
                cartId: result.data.cartId,
                cartItems: result.data.cartItems.map((item: CartItem) => {
                    return {
                        cartId: item.cartId,
                        productId: item.productId,
                        quantity: item.quantity,
                        product: item.product,
                    };
                }),
                deliveryDate: result.data.deliveryDate,
                deliveryTime: result.data.deliveryTime,
                userId: result.data.userId,
            };
            setUserCart(userCart);
            return userCart;
        } catch (error) {
            switch (error.response.status) {
                case 500:
                    throw new SystemError(error.response.data);
                case 400:
                    throw new BadRequestError(error.response.data);
                default:
                    throw new UnknownError(error.response.data);
            }
        }
    }, [axiosPrivate]);

    useEffect(() => {
        getUserCartAsync().catch((error) => {
            console.error("Failed to fetch cart items:", error);
        });
    }, [getUserCartAsync]);

    async function addProductToCartAsync(data: AddCartDto) {
        try {
            await axiosPrivate.post("/cart/add-product", data);
            await getUserCartAsync();
        } catch (error) {
            switch (error.response.status) {
                case 500:
                    throw new SystemError(error.response.data);
                case 400:
                    throw new BadRequestError(error.response.data);
                default:
                    throw new UnknownError(error.response.data);
            }
        }
    }

    return (
        <CartContext.Provider value={{ userCart, getUserCartAsync, addProductToCartAsync }}>
            {children}
        </CartContext.Provider>
    );
};