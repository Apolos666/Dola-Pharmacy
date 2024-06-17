import {FaFacebookF} from "react-icons/fa";

function FacebookButton({ className } : {className?: string}) {
    return (
        <>
            <button className={`${className} flex items-center gap-4 py-2 px-6 bg-[#3B5998]`}>
                <FaFacebookF className="text-white"/>
                <div className="text-white">Facebook</div>
            </button>
        </>
    )
}

export default FacebookButton