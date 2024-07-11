import {CartProvider} from "@/contexts/Cart/CartProvider.tsx";
import {Outlet} from "react-router-dom";

export function CheckoutLayout() {
    return (
        <>
            <CartProvider>
                <Outlet />
            </ CartProvider>
        </>
    )
}