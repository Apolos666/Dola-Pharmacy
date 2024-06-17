import {useAxiosPrivate} from "@/hooks/useAxiosPrivate.tsx";
import {accountApi} from "@/api/account.ts";

function Home() {
    const axiosPrivate = useAxiosPrivate();

    async function Test() {
        console.log("Test")
        const response = await axiosPrivate.get('/test/test-function');
    }


    // Handle toast error after
    async function LogoutTest() {
        const response = await accountApi.requestLogoutAsync();
        console.log(response);
    }

    return (
        <>
            <div>Home</div>
            <button onClick={Test} className="bg-black text-white">Click</button>
            <button onClick={LogoutTest} className="bg-black text-white">Logout</button>
        </>
    )
}

export default Home