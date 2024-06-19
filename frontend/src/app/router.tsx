import {createBrowserRouter} from "react-router-dom";
import AppLayout from "../layouts/AppLayout.tsx";
import Home from "../pages/Home.tsx";
import {Login} from "../pages/Login.tsx";
import {Register} from "@/pages/Register.tsx";
import EmailVerification from "@/pages/EmailVerification.tsx";
import ResetPassword from "@/pages/ResetPassword.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        handle: {
            crumb: () => "Trang chủ"
        },
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: '/account',
                children: [
                    {
                        index: true,
                        element: <Login/>,
                        handle: {
                            crumb: () => "Đăng nhập tài khoản"
                        }
                    },
                    {   path: 'login',
                        element: <Login/>,
                        handle: {
                            crumb: () => "Đăng nhập tài khoản"
                        }
                    },
                    {   path: 'register',
                        element: <Register />,
                        handle: {
                            crumb: () => "Đăng ký tài khoản"
                        }
                    },
                    {   path: 'email-verification',
                        element: <EmailVerification />,
                        handle: {
                            crumb: () => "Xác thực email"
                        }
                    },
                    {
                        path: 'reset-password/:email/:token',
                        element: <ResetPassword />,
                        handle: {
                            crumb: () => "Đặt lại mật khẩu"
                        }
                    }
                ]
            }
        ]
    }
])