import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {AuthProvider} from "@/contexts/AuthProvider.tsx";
import {LoadingProvider} from "@/contexts/LoadingProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <LoadingProvider>
          <AuthProvider>
              <RouterProvider router={router} />
          </AuthProvider>
      </LoadingProvider>
  </React.StrictMode>,
)

