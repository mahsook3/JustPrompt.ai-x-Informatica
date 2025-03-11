import React, { useState } from "react";
import Sidebar from "./Sidebar";
import CrossResult from "../CrossResults/CrossResult";
import NoCodeBuilderDashboard from "../NoCodeBuilder/NoCodeBuilderDashboard";
import Home from "../Home/Home";
import Account from "./Account";
import AdsHome from "../Ads/AdsHome";

export default function ParentDashboard() {
  const [activeComponent, setActiveComponent] = useState("Home"); // Set default active component to "Home"

  const renderComponent = () => {
    switch (activeComponent) {
      case "Business Advisor":
        return <CrossResult setActiveComponent={setActiveComponent} />;
      case "No code Builder":
        return <NoCodeBuilderDashboard />;
      case "Home":
        return <Home setActiveComponent={setActiveComponent} />;
      case "Manage your Account":
        return <Account />;
      case "Ads":
        return <AdsHome />;
      default:
        return <Home setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Pass activeComponent as prop to Sidebar */}
      <Sidebar 
        setActiveComponent={setActiveComponent} 
        activeComponent={activeComponent}
      />
      <main className="pl-16">
        <div className="">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
}