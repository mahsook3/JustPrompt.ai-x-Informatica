import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logouticon from '../assets/logout.svg';
import { IoMdContact } from "react-icons/io";

export default function Header() {
    const { user } = useContext(UserContext);
    const { logOutUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    useEffect(() => {
        if (user && user.profile) {
            console.log(user.profile.email);
        }
    }, [user]);

    const logOut = async () => {
        try {
            const loggedOut = await logOutUser();
            if (loggedOut) {
                navigate('/');
                toast.success("Logged out successfully!");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
    };

    // Get userEmail from localStorage
    const userEmail = localStorage.getItem('userEmail');

    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-between p-2 bg-white"> {/* Reduced padding from p-4 to p-2 */}
                <a href="/" className="flex items-center">
                    <p className="text-2xl font-bold text-green-500">
                        Just
                        <span className="text-gray-800">Prompt.ai</span>
                    </p>
                </a>
                <div className="relative">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        ref={buttonRef}
                    
                    >
                        <IoMdContact className="h-11 w-11" />
                    </button>
                    {dropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        >
                            <div className="py-1">
                                <button
                                    onClick={logOut}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <img src={logouticon} alt="Logout" className="h-5 w-5 mr-2" />
                                    {userEmail ? userEmail : "Logout"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}