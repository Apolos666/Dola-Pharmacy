import Header from "../components/Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import Footer from "@/components/Footer.tsx";
import Spinner from "@/components/Spinner/Spinner.tsx";
import {useContext, useEffect} from "react";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";
import "../app/app.css"
import {BreadCrumbCustom} from "@/components/BreadCrumb/BreadCrumbCustom.tsx";
import {CartProvider} from "@/contexts/Cart/CartProvider.tsx";
import {useUserProfile} from "@/hooks/useUserProfile.tsx";

function MainLayout() {
    const { isLoading } = useContext(LoadingContext);
    const {GetMeAsync} = useUserProfile();

    useEffect(() => {
        GetMeAsync();
    }, []);

    return (
        <>
            <CartProvider>
                <Header/>
                <BreadCrumbCustom />
                <Outlet/>
                <Footer/>
                <Toaster/>
                {isLoading && <Spinner/>}
            </CartProvider>
        </>
    )
}

export default MainLayout