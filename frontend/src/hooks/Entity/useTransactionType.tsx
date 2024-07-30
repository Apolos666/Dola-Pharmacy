import axios from "@/api/Base/axios.ts";
import {useEffect, useState} from "react";

type ShippingMethod = {
    MethodId: string;
    MethodName: string;
    ShippingCost: number;
}

type PaymentMethod = {
    MethodId: string;
    MethodName: string;
}

export function useTransactionType() {
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

    async function GetAllShippingMethod() {
        const response = await axios.get("/transactiontype/get-all-shipping-methods");
        const shippingMethods: ShippingMethod[] = response.data.map((item: any) => {
            return {
                MethodId: item.methodId,
                MethodName: item.methodName,
                ShippingCost: item.shippingCost
            }
        })
        setShippingMethods(shippingMethods);
        return shippingMethods;
    }

    async function GetAllPaymentMethod() {
        const response = await axios.get("/transactiontype/get-all-payment-methods");
        const paymentMethods: PaymentMethod[] = response.data.map((item: any) => {
            return {
                MethodId: item.methodId,
                MethodName: item.methodName
            }
        })
        setPaymentMethods(paymentMethods);
        return paymentMethods;
    }

    useEffect( () => {
        GetAllShippingMethod()
        GetAllPaymentMethod()
    }, []);

    return {
        shippingMethods,
        paymentMethods
    }
}