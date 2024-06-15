import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import Footer from "@/components/Footer.tsx";

function AppLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Toaster/>
        </>
    )
}

export default AppLayout