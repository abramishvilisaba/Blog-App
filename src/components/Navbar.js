import React, { useState } from "react";
import Logo from "../images/LOGO.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "./LoginForm";
import LoginSuccess from "./LoginSuccess";
import { apiLogin } from "../api/blogAPI";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    // console.log(error);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLogin = async (email) => {
        try {
            const response = await apiLogin(email);
            console.log(response.status);
            setLoggedIn(true);
        } catch (error) {
            // console.log("Error logging in:", error);
        }
    };

    return (
        <nav className="bg-white h-[80px] flex items-center justify-between px-24 fixed w-full">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-6 mr-4" />
            </div>
            <div>
                {!loggedIn ? (
                    <button
                        onClick={togglePopup}
                        className="bg-[#5D37F3] hover:bg-[#4A22EA] text-white font-semibold px-4 py-2 rounded-2xl"
                    >
                        შესვლა
                    </button>
                ) : (
                    <Link to={"create"}>
                        <button
                            // onClick={togglePopup}
                            className="bg-[#5D37F3] hover:bg-[#4A22EA] text-white font-semibold px-4 py-2 rounded-2xl"
                        >
                            დაამატე ბლოგი
                        </button>
                    </Link>
                )}
                {showPopup && (
                    <div className="fixed flex flex-col w-1/4 h-[300px] justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg">
                        <button
                            onClick={togglePopup}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        {loggedIn ? (
                            <LoginSuccess onClose={togglePopup} />
                        ) : (
                            <LoginForm onSubmit={handleLogin} />
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
