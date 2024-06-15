import Header from "../components/Header.tsx";
import {Outlet, useNavigation} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import Footer from "@/components/Footer.tsx";
import Spinner from "@/components/Spinner/Spinner.tsx";

function AppLayout() {
    const { state }= useNavigation();

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Toaster/>
            {state === "submitting" ? <Spinner/> : ""}
        </>
    )
}

export default AppLayout