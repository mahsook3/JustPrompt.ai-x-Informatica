import React, { useContext, useState, useEffect } from 'react';
import { TbDragDrop, TbMessageChatbotFilled } from "react-icons/tb";
import { RiFlowChart } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { UserContext } from '../contexts/user.context';
import { toast } from 'react-toastify'; 
import { useNavigate, useLocation } from 'react-router-dom';
import DashBoard from '../FlowCode/DashBoard'; // for Build through Flowart
import ChatbotInterface from '../Chatbot/ChatbotInterface'; // for Build through ChatDoc
import Builder from '../pages/Builder'; // for Instant Present

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
            icon: IoHome,
            component: <Home />,
            path: "/"
        },
        {
            title: "Build through Flowart",
            icon: RiFlowChart,
            component: <DashBoard />,
            path: "/dashboard/builder/flow"
        },
        {
            title: "Build through ChatDoc",
            icon: TbMessageChatbotFilled,
            component: <ChatbotInterface />,
            path: "/dashboard/builder/chatdoc"
        },
        {
            title: "Instant Present",
            icon: TbDragDrop,
            component: <Builder />,
            path: "/dashboard/builder/instantpresent"
        }
    ];

    const handleTabClick = (title) => {
        setActiveTab(title);
        const tab = Tabs.find(tab => tab.title === title);
        if (tab) {
            navigate(tab.path);
        }
    };

    const renderComponent = () => {
        const activeTabObj = Tabs.find(tab => tab.title === activeTab);
        return activeTabObj ? activeTabObj.component : null;
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                {/* Navigation */}
                <nav className="mt-6 space-y-6">
                    {Tabs.map((tab) => (
                        <NavItem
                            key={tab.title}
                            tab={tab}
                            activeTab={activeTab}
                            handleTabClick={handleTabClick}
                        />
                    ))}
                </nav>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6">
                {renderComponent()}
            </div>
        </div>
    );
}

const NavItem = ({ tab, activeTab, handleTabClick }) => {
    const Icon = tab.icon;

    return (
        <button
            className={`flex items-center w-full px-4 py-3 transition-colors duration-200 ${
                activeTab === tab.title
                    ? 'bg-green-50 text-green-500'
                    : 'text-gray-900 hover:bg-green-50'
            } transition-all duration-300`}
            onClick={() => handleTabClick(tab.title)}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-normal">{tab.title}</span>
        </button>
    );
};

function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}