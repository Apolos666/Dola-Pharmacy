import {createBrowserRouter} from "react-router-dom";
import AppLayout from "../layouts/AppLayout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import {registerRoute} from "@/pages/Register.tsx";
import EmailVerification from "@/pages/EmailVerification.tsx";

export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {   path: '/', element: <Home/>},
            {
                path: '/account',
                children: [
                    {   path: 'login', element: <Login />},
                    {   path: 'register',
                        ...registerRoute
                    },
                    {   path: 'email-verification', element: <EmailVerification />},
                ]
            }
        ]
    }
])