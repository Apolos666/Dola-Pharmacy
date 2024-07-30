import {createContext} from "react";
import {AddOrderDto} from "@/model/OrderType.ts";

export type CheckoutContextType = {
    order: AddOrderDto;
    setOrder: (update: (prev: AddOrderDto) => AddOrderDto) => void;
    HandleCheckoutAsync: (addOrderDto: AddOrderDto | null) => Promise<void>;
};

export const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);
