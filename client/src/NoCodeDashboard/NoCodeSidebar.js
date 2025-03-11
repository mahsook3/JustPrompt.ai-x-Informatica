import React, { useState, useContext } from 'react';
import { Command, Code2, CircleUserRound, LogOut,FileScan,Blocks,MessageSquareCode,Workflow  } from 'lucide-react';
import DashBoard from '../FlowCode/DashBoard';
import ChatbotInterface from '../Chatbot/ChatbotInterface';
import Builder from '../pages/Builder';
import { UserContext } from '../contexts/user.context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../AlgoToCode/Dashboard';
import DocumentGenerator from '../DocumentGenerator/DocumentGenerator';


const items = [
  {
    icon: Workflow,
    label: "Flowchart to code",
    component: DashBoard,
  },
  {
    icon: MessageSquareCode,
    label: "Chatbot",
    component: ChatbotInterface,
  },
  {
    icon: Blocks,
    label: "Instant Present Builder",
    component: Builder,
  },
  {
    icon: FileScan,
    label: "Algorithm To Code",
    component: Dashboard,
  },
  // {
  //   icon: Code2,
  //   label: "Document Generator",
  //   component: DocumentGenerator,
  // },
];

const bottomItems = [
  {
    icon: CircleUserRound,
    label: "Manage your Account",
    href: "#server",
  },
  {
    icon: LogOut,
    label: "Log Out",
    action: "logout",
  },
];

const NoCodeSidebar = ({ setActiveComponent }) => {
  const { logOutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState("Flowart Dashboard");

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

  const handleItemClick = (item) => {
    if (item.action === "logout") {
      logOut();
    } else {
      setActiveItem(item.label);
      setActiveComponent(item.component);
    }
  };

  return (
    <nav className="fixed left-0 top-0 flex h-screen w-16 flex-col justify-between bg-[#0a1f44] py-4">
      <div>
        {items.map((item) => (
          <div
            key={item.label}
            className="group relative flex h-12 w-full items-center justify-center"
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {activeItem === item.label && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="1080"
                  height="1018"
                  viewBox="0 0 1080 1018"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="918" width="162" height="1018" fill="white" />
                  <rect y="74" width="162" height="917" fill="#0A1F44" />
                  <path
                    d="M43 194C43 144.294 83.2944 104 133 104H1080V914H133C83.2944 914 43 873.706 43 824V194Z"
                    fill="white"
                  />
                  <path
                    d="M1080 0H0V104H990C1039.71 104 1080 63.7056 1080 14V0Z"
                    fill="#0A1F44"
                  />
                  <path
                    d="M1080 1004C1080 954.294 1039.71 914 990 914H0V1018H1080V1004Z"
                    fill="#0A1F44"
                  />
                </svg>
              </div>
            )}
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item);
              }}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-all
                ${
                  activeItem === item.label
                    ? "text-[#0a1f44]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <item.icon className="h-5 w-5" />
            </a>

            {/* Tooltip */}
            {hoveredItem === item.label && (
              <div className="absolute left-16 z-50 ml-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm text-white">
                {item.label}
                {/* Arrow */}
                <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-900" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {bottomItems.map((item) => (
          <div
            key={item.label}
            className="group relative flex h-12 w-full items-center justify-center"
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {activeItem === item.label && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="1080"
                  height="1018"
                  viewBox="0 0 1080 1018"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="918" width="162" height="1018" fill="white" />
                  <rect y="74" width="162" height="917" fill="#0A1F44" />
                  <path
                    d="M43 194C43 144.294 83.2944 104 133 104H1080V914H133C83.2944 914 43 873.706 43 824V194Z"
                    fill="white"
                  />
                  <path
                    d="M1080 0H0V104H990C1039.71 104 1080 63.7056 1080 14V0Z"
                    fill="#0A1F44"
                  />
                  <path
                    d="M1080 1004C1080 954.294 1039.71 914 990 914H0V1018H1080V1004Z"
                    fill="#0A1F44"
                  />
                </svg>
              </div>
            )}
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item);
              }}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-all
                ${
                  activeItem === item.label
                    ? "text-[#0a1f44]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <item.icon className="h-5 w-5" />
            </a>

            {/* Tooltip */}
            {hoveredItem === item.label && (
              <div className="absolute left-16 z-50 ml-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm text-white">
                {item.label}
                {/* Arrow */}
                <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-900" />
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NoCodeSidebar;