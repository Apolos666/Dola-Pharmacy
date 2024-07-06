import {useAxiosPrivate} from "@/hooks/useAxiosPrivate.tsx";
import {BadRequestError, SystemError, UnknownError} from "@/api/Exception/ApiErrorException.ts";
import {Product} from "@/components/ProductDisplay/ProductDisplayConfig.ts";

export type AddCartDto = {
    productId: string,
    quantity: number
}

export type CartItem = {
    cartId: string,
    productId: string,
    quantity: number,
    product: Product
}

export type UserCart = {
    cartId: string,
    cartItems: CartItem[],
    deliveryDate: string,
    deliveryTime: string,
    userId: string,
}

export function useCart() {
    const axiosPrivate = useAxiosPrivate();

    async function getUserCartAsync() {
        try {
            const result = await axiosPrivate.get("/cart/get-user-cart");
            const userCart: UserCart = {
                cartId: result.data.cartId,
                cartItems: result.data.cartItems.map((item: CartItem) => {
                    return {
                        cartId: item.cartId,
                        productId: item.productId,
                        quantity: item.quantity,
                        product: item.product
                    }
                }),
                deliveryDate: result.data.deliveryDate,
                deliveryTime: result.data.deliveryTime,
                userId: result.data.userId
            }
            return userCart;
        } catch (error) {
            switch (error.response.status) {
                case 500:
                    throw new SystemError(error.response.data)
                case 400:
                    throw new BadRequestError(error.response.data)
                default:
                    throw new UnknownError(error.response.data)
            }
        }
    }

    async function addProductToCartAsync(data: AddCartDto) {
        try {
            return await axiosPrivate.post("/cart/add-product", data);
        } catch (error) {
            switch (error.response.status) {
                case 500:
                    throw new SystemError(error.response.data)
                case 400:
                    throw new BadRequestError(error.response.data)
                default:
                    throw new UnknownError(error.response.data)
            }
        }
    }

    return { getUserCartAsync ,addProductToCartAsync }
}