import {useContext} from "react";
import {CheckoutContext} from "@/contexts/Checkout/CheckoutProviderConfig.ts";

export const useOrderUser = () => {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error("useOrderUser must be used within a CheckoutProvider");
    }
    return context;
};