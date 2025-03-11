import React, { useState, useContext } from "react";
import { Code2, Telescope, CircleUserRound, LogOut, Home as HomeIcon, Clapperboard } from "lucide-react";
import { UserContext } from "../contexts/user.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const items = [
  {
    icon: HomeIcon,
    label: "Home",
  },
  {
    icon: Telescope,
    label: "Business Advisor",
  },
  {
    icon: Code2,
    label: "No code Builder",
  },
  {
    icon: Clapperboard,
    label: "Ads",
  },
];

const bottomItems = [
  {
    icon: CircleUserRound,
    label: "Manage your Account",
  },
  {
    icon: LogOut,
    label: "Log Out",
    action: "logout",
  },
];

const Sidebar = ({ setActiveComponent, activeComponent }) => {
  const { logOutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleItemClick = (item) => {
    if (item.action === "logout") {
      logOut();
    } else {
      setActiveComponent(item.label);
    }
  };

  const renderItems = (items) => {
    return items.map((item) => (
      <div
        key={item.label}
        className="group relative flex h-12 w-full items-center justify-center"
        onMouseEnter={() => setHoveredItem(item.label)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick(item);
          }}
          className={`relative z-30 flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
            activeComponent === item.label
              ? "text-green-400"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <item.icon className="h-5 w-5" />
        </a>

        {hoveredItem === item.label && activeComponent !== item.label && (
          <div className="absolute left-16 z-40 ml-2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-sm text-white">
            {item.label}
            <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-900" />
          </div>
        )}
      </div>
    ));
  };

  return (
    <nav className="fixed left-0 top-0 flex h-screen w-16 flex-col justify-between bg-[#0a1f44] py-4">
      <div className="z-30">
        {renderItems(items)}
      </div>
      <div>
        {renderItems(bottomItems)}
      </div>
    </nav>
  );
};

export default Sidebar;