import React from "react";

import Logo from "../images/LOGO.png";

const Navbar = () => {
    return (
        <nav className="bg-white fill-white  h-[80px] flex items-center justify-between px-24 fixed w-full  ">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className=" h-6 mr-4" />
            </div>
            <div>
                <button className="bg-[#5D37F3] hover:bg-[#4A22EA] text-white font-semibold px-4 py-2 rounded-lg">
                    შესვლა
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
