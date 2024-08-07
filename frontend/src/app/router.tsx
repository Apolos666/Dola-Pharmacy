import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import {Login} from "../pages/Login.tsx";
import {Register} from "@/pages/Register.tsx";
import EmailVerification from "@/pages/EmailVerification.tsx";
import ResetPassword from "@/pages/ResetPassword.tsx";
import {Product} from "@/pages/Product.tsx";
import {UserCart} from "@/pages/UserCart.tsx";
import {Checkout} from "@/pages/Checkout.tsx";
import {CheckoutLayout} from "@/layouts/CheckoutLayout.tsx";
import { SuccessCheckout } from "@/pages/SuccessCheckout.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
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
            },
            {
                path: '/products',
                children: [
                    {
                        index: true,
                        element: <Product />,
                        handle: {
                            crumb: () => "Tất cả sản phẩm"
                        }
                    },
                    {
                        path: ":productTypeNameNormalized?",
                        element: <Product />,
                        handle: {
                            crumb: (productTypeNameNormalized: string) => productTypeNameNormalized
                        }
                    }
                ]
            },
            {
                path: '/cart',
                element: <UserCart />,
                handle: {
                    crumb: () => "Giỏ hàng"
                }
            },
        ]
    },
    {
        path: '/checkout',
        element: <CheckoutLayout />,
        children: [
            {
                index: true,
                element: <Checkout />,
            },
            {
                path: 'success',
                element: <SuccessCheckout />,
            }
        ]
    }
])