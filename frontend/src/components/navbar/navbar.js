import React from "react";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  return (
    <div className=" bg-green-300 w-full h-20  px-5 py-2 ">
      <div className="flex w-full">
        <div className="flex justify-start">
          <img className="h-12 " src="./greenify-removebg.png" alt="/" />
        </div>

        <div className="w-full flex justify-end">
          <button
            className="h-10 bg-green-500  py-1 px-3  hover:bg-green-700 rounded text-white mt-4 md:mt-0"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
