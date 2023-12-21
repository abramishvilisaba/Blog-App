import React from "react";
import TickCircle from "../images/TickCircle.svg";

const LoginSuccess = ({ onClose }) => {
    return (
        <div className="h-full flex flex-col justify-around  items-center">
            <img src={TickCircle} className="h-16 w-16 mt-8" alt="TickCircle" />

            <p className="text-[18px] font-semibold mt-2 mb-12 w-fit">წარმატებული ავტორიზაცია</p>
            <button
                onClick={onClose}
                className="bg-primary hover:bg-[#2522ea] text-white font-medium w-full px-4 py-2 mb-4  rounded-xl"
            >
                კარგი
            </button>
        </div>
    );
};

export default LoginSuccess;
