import {CartProvider} from "@/contexts/Cart/CartProvider.tsx";
import {Outlet} from "react-router-dom";
import {useUserProfile} from "@/hooks/useUserProfile.tsx";
import {useEffect} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";

export function CheckoutLayout() {
    const {GetMeAsync} = useUserProfile();

    useEffect(() => {
        GetMeAsync();
    }, []);

    return (
        <>
            <CartProvider>
                <Outlet />
                <Toaster />
            </ CartProvider>
        </>
    )
}