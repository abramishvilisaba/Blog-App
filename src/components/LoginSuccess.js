import React from "react";
import TickCircle from "../images/TickCircle.svg";

const LoginSuccess = ({ onClose, successText, buttonText }) => {
    return (
        <div className="h-full flex flex-col justify-around items-center">
            <img src={TickCircle} className="h-16 w-16 mt-8" alt="TickCircle" />

            <p className="text-[20px] font-bold mt-2 mb-12 w-fit">{successText}</p>
            <button
                onClick={onClose}
                className="bg-indigo hover:bg-[#2522ea] text-white font-medium text-sm w-full h-[40px] px-4 py-2 mb-1 rounded-xl"
            >
                {buttonText}
            </button>
        </div>
    );
};

export default LoginSuccess;
