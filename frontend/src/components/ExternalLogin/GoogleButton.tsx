import {FaGooglePlusG} from "react-icons/fa";

function GoogleButton({ className } : {className?: string}) {
  return (
      <>
        <button className={`${className} flex items-center gap-4 py-2 px-6 bg-[#E14B33]`}>
          <FaGooglePlusG className="text-white"/>
          <div className="text-white">Google</div>
        </button>
      </>
  );
}

export default GoogleButton;