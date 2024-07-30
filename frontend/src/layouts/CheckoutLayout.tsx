import {CartProvider} from "@/contexts/Cart/CartProvider.tsx";
import {Outlet} from "react-router-dom";
import {useUserProfile} from "@/hooks/useUserProfile.tsx";
import {useContext, useEffect} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import Spinner from "@/components/Spinner/Spinner.tsx";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";

export function CheckoutLayout() {
    const { isLoading } = useContext(LoadingContext);
    const {GetMeAsync} = useUserProfile();

    useEffect(() => {
        GetMeAsync();
    }, []);

    return (
        <>
            <CartProvider>
                <Outlet />
                <Toaster />
                {isLoading && <Spinner/>}
            </ CartProvider>
        </>
    )
}