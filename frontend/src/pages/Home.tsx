import {useAxiosPrivate} from "@/hooks/useAxiosPrivate.tsx";
import {accountApi} from "@/api/Account/AccountApi.ts";
import {HomeSlider} from "@/components/HomeSlider/HomeSlider.tsx";

function Home() {
    const axiosPrivate = useAxiosPrivate();

    async function Test() {
        console.log("Test")
        await axiosPrivate.get('/test/test-function');
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
            </div>
        </>
    )
}

export default Home