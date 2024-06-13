import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";

function AppLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Toaster/>
        </>
    )
}

export default AppLayout