import Header from "../components/Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import Footer from "@/components/Footer.tsx";
import Spinner from "@/components/Spinner/Spinner.tsx";
import {useContext} from "react";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";
import "../app/app.css"
import {BreadCrumbCustom} from "@/components/BreadCrumb/BreadCrumbCustom.tsx";
import {AppProvider} from "@/contexts/AppContext/AppProvider.tsx";

function AppLayout() {
    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            <AppProvider>
                <Header/>
                <BreadCrumbCustom />
                <Outlet/>
                <Footer/>
                <Toaster/>
            </AppProvider>
            {isLoading && <Spinner/>}
        </>
    )
}

export default AppLayout