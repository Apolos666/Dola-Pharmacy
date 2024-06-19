import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {AuthProvider} from "@/contexts/AuthProvider.tsx";
import {LoadingProvider} from "@/contexts/LoadingProvider.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <LoadingProvider>
              <AuthProvider>
                  <RouterProvider router={router} />
              </AuthProvider>
          </LoadingProvider>
      </GoogleOAuthProvider>
  </React.StrictMode>,
)

