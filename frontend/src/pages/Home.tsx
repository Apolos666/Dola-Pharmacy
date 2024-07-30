import {useAxiosPrivate} from "@/hooks/useAxiosPrivate.tsx";
import {accountApi} from "@/api/Account/AccountApi.ts";
import {HomeSlider} from "@/components/HomeSlider/HomeSlider.tsx";
import axios from "@/api/Base/axios.ts";
import {useAuth} from "@/hooks/useAuth.tsx";
import { InvoiceOrderPdfShower } from "@/components/InvoiceOrderPdfShower/InvoiceOrderPdfShower";

function Home() {
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth()

    async function Test() {
        console.log("Test")
        await axiosPrivate.get('/test/test-function');
    }

    async function TestStripe() {
        try {
            const response = await axios.post("/order/Checkout")
                .then(response => {
                    console.log(response)
                    stripePromise?.redirectToCheckout({sessionId: response.data});
                });
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
    }


    // Handle toast error after
    async function LogoutTest() {
        const response = await accountApi.requestLogoutAsync();
        console.log(response);
    }

    return (
        <>
            <div className="w-full">
                <HomeSlider/>
                <InvoiceOrderPdfShower /> 
            </div>
        </>
    )
}

export default Home