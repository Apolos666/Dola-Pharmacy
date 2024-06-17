import {createBrowserRouter} from "react-router-dom";
import AppLayout from "../layouts/AppLayout.tsx";
import Home from "../pages/Home.tsx";
import {Login} from "../pages/Login.tsx";
import {Register} from "@/pages/Register.tsx";
import EmailVerification from "@/pages/EmailVerification.tsx";
import ResetPassword from "@/pages/ResetPassword.tsx";

export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {   path: '/',
                element: <Home/>
            },
            {
                path: '/account',
                children: [
                    {   path: 'login',
                        element: <Login />
                    },
                    {   path: 'register',
                        element: <Register />
                    },
                    {   path: 'email-verification',
                        element: <EmailVerification />
                    },
                    {
                        path: 'reset-password/:email/:token',
                        element: <ResetPassword />
                    }
                ]
            }
        ]
    }
])