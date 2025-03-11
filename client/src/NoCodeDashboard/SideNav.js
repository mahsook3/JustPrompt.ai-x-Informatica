import React, { useContext, useState, useEffect } from 'react';
import { TbDragDrop, TbMessageChatbotFilled } from "react-icons/tb";
import { RiFlowChart } from "react-icons/ri";
import { IoHome, IoLogOut } from "react-icons/io5";
import logo from "../assets/logodark.png";
import { UserContext } from '../contexts/user.context';
import { toast } from 'react-toastify'; 
import { useNavigate, useLocation } from 'react-router-dom';

export default function SideNav() {
    const { logOutUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        const currentTab = Tabs.find(tab => location.pathname.includes(tab.title.toLowerCase().replace(/\s+/g, '')));
        if (currentTab) {
            setActiveTab(currentTab.title);
        }
    }, [location.pathname]);

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

    const Tabs = [
        {
            title: "Home",
            icon: <IoHome />
        },
        {
            title: "Build through Flowart",
            icon: <RiFlowChart />
        },
        {
            title: "Build through ChatDoc",
            icon: <TbMessageChatbotFilled />
        },
        {
            title: "Instant Present",
            icon: <TbDragDrop />
        }
    ];

    const handleTabClick = (title) => {
        setActiveTab(title);
        navigate(`/dashboard/${title.toLowerCase().replace(/\s+/g, '')}`);
    };

    return (
        <nav
            aria-label="side bar w-81"
            aria-orientation="vertical"
            className="flex-none flex flex-col items-center text-center bg-green-400 text-white border-r h-full"
            style={{ height: '100vh' }}
        >
            <div className="h-16 flex items-center w-full">
                <img
                    className="h-6 w-6 mx-auto"
                    src={logo}
                />
            </div>
            <div className="flex flex-col w-full flex-grow">
                <ul className="flex-grow">
                    {Tabs.map((tab) => (
                        <li key={tab.title} className="relative">
                            <a
                                title={tab.title}
                                onClick={() => handleTabClick(tab.title)}
                                className={`h-16 px-6 flex items-center w-full ${activeTab === tab.title ? 'text-white bg-green-500' : 'hover:text-white'}`}
                            >
                                <i className="mx-auto text-2xl">
                                    {tab.icon}
                                </i>
                                <span className="absolute left-full ml-2 whitespace-nowrap bg-green-500 text-white px-2 py-1 rounded hidden group-hover:block">
                                    {tab.title}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto w-full">
                    <button
                        title="Logout"
                        onClick={logOut}
                        className="h-16 px-6 flex items-center hover:text-white w-full"
                    >
                        <i className="mx-auto text-2xl">
                            <IoLogOut />
                        </i>
                    </button>
                </div>
            </div>
        </nav>
    );
}