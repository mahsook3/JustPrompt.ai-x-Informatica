import React, { useState, useContext } from 'react';
import { Command, Code2, CircleUserRound, LogOut, FileScan, Blocks, MessageSquareCode, Workflow } from 'lucide-react';
import DashBoard from '../FlowCode/DashBoard';
import ChatbotInterface from '../Chatbot/ChatbotInterface';
import Builder from '../pages/Builder';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/user.context';
import Dashboard from '../AlgoToCode/Dashboard';
import DocumentGenerator from '../DocumentGenerator/DocumentGenerator';

const menuItems = {
  main: [
    { id: 'dashboard', icon: Workflow, label: 'Flowchart to code', component: DashBoard },
    { id: 'chatbot', icon: MessageSquareCode, label: 'Chatbot', component: ChatbotInterface },
    { id: 'builder', icon: Blocks, label: 'Instant Present Builder', component: Builder },
    { id: 'algoToCode', icon: FileScan, label: 'Algorithm To Code', component: Dashboard },
    // { id: 'documentGenerator', icon: Code2, label: 'Document Generator', component: DocumentGenerator },
  ],
};

const NoCodeDashboard = () => {
  const { logOutUser } = useContext(UserContext); // Use logOutUser from UserContext
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

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
    if (item.action === 'logout') {
      logOut();
    } else {
      setActiveTab(item.id);
    }
  };

  const renderComponent = () => {
    const activeItem = menuItems.main.find(item => item.id === activeTab);
    return activeItem ? <activeItem.component /> : null;
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Navigation */}
        <nav className="mt-6 space-y-6">
          {/* Main Section */}
          <div>
            <div className="px-4 py-2 block">
              <span className="text-xs font-semibold text-gray-400">MAIN</span>
            </div>
            {menuItems.main.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleItemClick={handleItemClick}
              />
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto relative">
        <div className="blur-sm">
          <main>
            {renderComponent()}
          </main>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <h1 className="text-4xl font-bold text-gradient-to-r from-green-400 to-purple-500"><span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
              Coming Soon!
            </span></h1>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ item, activeTab, handleItemClick }) => {
  const Icon = item.icon;

  return (
    <button
      className={`flex items-center w-full px-4 py-3 transition-colors duration-200 ${
        activeTab === item.id
          ? 'bg-green-50 text-green-500'
          : 'text-gray-900 hover:bg-green-50'
      }`}
      onClick={() => handleItemClick(item)}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-normal">{item.label}</span>
    </button>
  );
};

export default NoCodeDashboard;