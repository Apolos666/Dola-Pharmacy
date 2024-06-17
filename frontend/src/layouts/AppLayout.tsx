import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import Footer from "@/components/Footer.tsx";
import Spinner from "@/components/Spinner/Spinner.tsx";
import {useContext} from "react";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";

function AppLayout() {
    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Toaster/>
            {isLoading && <Spinner/>}
        </>
    )
}

export default AppLayout