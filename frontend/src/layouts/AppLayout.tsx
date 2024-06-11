import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";

function AppLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default AppLayout