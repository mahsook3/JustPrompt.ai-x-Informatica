import React, { useState, useEffect, useRef, useContext } from "react";
import { Search, Bell, User } from "lucide-react";
import Translator from "./Translator";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { toast } from "react-toastify";

export default function Header({ setActiveTab, setActiveComponent }) {
  const [activeItem, setActiveItem] = useState("Home");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const {
    exportingCountry,
    destinationCountry,
    businessDetails,
    products,
    selectedState,
    selectedDistrict,
    keywords,
    selectedLanguage,
  } = useSelector((state) => state.form.formData);
  const { logOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        navigate("/");
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
      setActiveComponent(item.label);
    }
  };

  const notificationToTabMapping = {
    "Local Products & Origin data received": "local",
    "Product Category data updated": "ProductCategoryAndComplianceRequirement",
    "HSN and GST information received": "hsnGstData",
    "GST Details updated": "gst",
    "Duty Drawback data received": "duty",
    "Export Promotion Councils information updated": "export"
  };

  const searchableItems = [
    { 
      title: 'How to Start Export',
      id: 'start',
      keywords: 'begin export business startup registration documentation iec code process steps guide initiate commence exporter license help'
    },
    { 
      title: 'Local Products & Origin',
      id: 'local',
      keywords: 'domestic products local origin manufacturing source certificate coo made in india regional goods merchandise production'
    },
    { 
      title: 'Product Category',
      id: 'product',
      keywords: 'classification hs code product type category harmonized system commodity goods item merchandise export items'
    },
    { 
      title: 'Compliance Requirement',
      id: 'compliance',
      keywords: 'regulations rules standards requirements compliance legal certification permits licenses documents approval authorization'
    },
    { 
      title: 'RoDTEP',
      id: 'hsn',
      keywords: 'remission duties taxes exported products scheme rebate tax refund export benefits incentives rodtep rates calculation'
    },
    { 
      title: 'Market Analysis',
      id: 'market',
      keywords: 'research trends demand statistics data analysis market study competitors pricing international trade reports insights'
    },
    { 
      title: 'GST Details',
      id: 'gst',
      keywords: 'goods services tax gst rates input credit return filing taxation invoice igst customs duty'
    },
    { 
      title: 'Duty Drawback',
      id: 'duty',
      keywords: 'customs duty refund drawback scheme rates benefits tax rebate import duty return reimbursement'
    },
    { 
      title: 'Promotion Councils',
      id: 'export',
      keywords: 'export promotion council trade associations organizations support assistance guidance epcs federation chambers'
    },
    { 
      title: 'Required Documents',
      id: 'documents',
      keywords: 'documentation paperwork certificates forms requirements shipping bill invoice packing list export documents'
    },
  ];

  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Welcome to JustPrompt.ai",
      read: false,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  const isFormDataComplete = () => {
    return Boolean(
      exportingCountry &&
      destinationCountry &&
      businessDetails &&
      products &&
      selectedState &&
      selectedDistrict &&
      keywords
    );
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setShowSearchResults(false);
      return;
    }

    const filtered = searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  // Handle click outside search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle click outside notifications
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // Handle click outside user menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Monitor session storage and update notifications
  useEffect(() => {
    if (!isFormDataComplete()) {
      setNotifications([
        {
          id: Date.now(),
          text: "Welcome to JustPrompt.ai",
          read: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      return;
    }

    const sessionStorageKeys = {
      local: "Local Products & Origin data received",
      ProductCategoryAndComplianceRequirement: "Product Category data updated",
      hsnGstData: "HSN and GST information received",
      gstDetails: "GST Details updated",
      dutyDrawbackData: "Duty Drawback data received",
      exportcouncil: "Export Promotion Councils information updated",
    };

    // Create a new array to store notifications
    const newNotifications = [...notifications];
    let hasChanges = false;

    Object.entries(sessionStorageKeys).forEach(([key, message]) => {
      const value = sessionStorage.getItem(key);
      if (value) {
        const notificationExists = newNotifications.some(
          (n) => n.text === message
        );
        if (!notificationExists) {
          hasChanges = true;
          newNotifications.unshift({
            id: Date.now(),
            text: message,
            read: false,
            timestamp: new Date().toISOString(),
          });
        }
      }
    });

    // Only update state if there are changes
    if (hasChanges) {
      setNotifications(
        newNotifications.filter((n) => n.text !== "Welcome to JustPrompt.ai")
      );
    }
  }, [
    exportingCountry,
    destinationCountry,
    businessDetails,
    products,
    selectedState,
    selectedDistrict,
    keywords,
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "1 hour ago";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end h-16">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />

                {/* Search Results Dropdown */}
                {showSearchResults && searchQuery && (
                  <div className="absolute mt-2 w-96 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto z-50">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            if (setActiveTab) {
                              setActiveTab(item.id);
                            }
                            setShowSearchResults(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative z-30" ref={notificationsRef}>
                <button
                  className="p-1 rounded-full text-gray-600 hover:text-gray-900"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          Notifications
                        </h3>
                        <button
                          className="text-xs text-green-600 hover:text-green-800"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="px-4 py-2 text-sm text-gray-500">
                            No notifications
                          </p>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                                notification.read ? "opacity-70" : "bg-green-50"
                              }`}
                              onClick={() => {
                                const tabId = notificationToTabMapping[notification.text];
                                if (tabId && setActiveTab) {
                                  setActiveTab(tabId);
                                  setShowNotifications(false);
                                  setNotifications(notifications.map(n =>
                                    n.id === notification.id ? { ...n, read: true } : n
                                  ));
                                }
                              }}
                            >
                              <p className="text-sm text-gray-700">
                                {notification.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimestamp(notification.timestamp)}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Translator />

              {/* Profile */}
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                </button>
                {showUserMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setActiveTab("account");
                          setShowUserMenu(false);
                        }}
                      >
                        Manage Account
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          logOut();
                          setShowUserMenu(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}