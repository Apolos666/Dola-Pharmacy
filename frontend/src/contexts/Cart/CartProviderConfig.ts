import { createContext, useContext } from "react";
import { Product } from "@/components/ProductDisplay/ProductDisplayConfig.ts";

export type AddCartDto = {
    productId: string;
    quantity: number;
};

export type UpdateCartProductDto = {
    productId: string;
    quantity: number;
}

export type UpdateCartUserDto = {
    deliveryDate: string;
    deliveryTime?: string;
}

export type CartItem = {
    cartId: string;
    productId: string;
    quantity: number;
    product: Product;
};

export type UserCart = {
    cartId: string;
    cartItems: CartItem[];
    deliveryDate: string;
    deliveryTime: string;
    userId: string;
};

export type CartContextType = {
    userCart: UserCart | null;
    getUserCartAsync: () => Promise<UserCart | void>;
    addProductToCartAsync: (data: AddCartDto) => Promise<void>;
    updateProductInCartAsync: (data: UpdateCartProductDto) => Promise<void>;
    removeProductFromCartAsync: (productId: string) => Promise<void>;
    updateCartUserAsync: (data: UpdateCartUserDto) => Promise<void>;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};