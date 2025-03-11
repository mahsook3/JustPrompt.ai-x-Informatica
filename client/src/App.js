import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import Error from "./pages/Error.page";
import LandingPage from "./pages/LandingPage";
import Preview from "./pages/Preview";
import PreviewInNewTab from "./pages/PreviewInNewTab"; 
import Builder from "./pages/Builder";
import CompanyHtmlContent from "./pages/CompanyHtmlContent";
import PublishedPage from "./pages/PublishedPage";
import ChatbotInterface from './Chatbot/ChatbotInterface';
import Flowdemo from './Chatbot/Flowchart';
import SDLCDashboard from './sdlc/SDLCDashboard';
import DashBoard from './NoCodeDashboard/Dashboard';
import Profile from './NoCodeDashboard/Profile';
import "./tailwind.css";
import Flowchart from './FlowCode/DashBoard';
import CrossDashboard from './CrossResults/CrossResult';
import ParentDashboard from './ParentDashboard/ParentDashboard';
import Sidebar from './ParentDashboard/Sidebar';
import DashboardLayout from './NoCodeDashboard/DashboardLayout';
import ChatbotButton from './Chatbot'; 
import GenerateCcontent from './templates/GenerateCcontent';
import BuildUI from './templates/BuildUI';
import Public from './templates/Public';
import NoCodeBuilderDashboard from './NoCodeBuilder/NoCodeBuilderDashboard';
import UICreator from './NoCodeBuilder/UICreator';
import Test from './pages/Test';


function SidebarWrapper({ Component }) {
  return (
    <div className="sidebar-wrapper">
      <Sidebar />
      <Component />
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<ParentDashboard />} />
            <Route path="/Dashboard/nocode" element={<DashBoard />} />
            <Route path="/dashboard/builder/instantpresent" element={<SidebarWrapper Component={Builder} />} />
            <Route path="/dashboard/builder/chatdoc" element={<SidebarWrapper Component={SDLCDashboard} />} />
            <Route path="/dashboard/builder/flow" element={<SidebarWrapper Component={Flowchart} />} />
            <Route path="/Dashboard/profile" element={<Profile />} />
            <Route path="/Dashboard/crossresult" element={<CrossDashboard />} />
            <Route path="/builder/chatbot" element={<ChatbotInterface />} />
            <Route path="/flowchart" element={<Flowdemo />} />
            <Route path="/chatbot" element={<ChatbotInterface />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/published/:id" element={<PublishedPage />} />
            <Route path="/preview-in-new-tab" element={<PreviewInNewTab />} />
            <Route path="/d/:workplaceUrl" element={<CompanyHtmlContent />} />
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route path="home" element={<DashBoard />} />
              <Route path="buildthroughflowart" element={<SDLCDashboard />} />
              <Route path="buildthroughchatdoc" element={<ChatbotInterface />} />
              <Route path="instantpresent" element={<Builder />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/generatecontent" element={<GenerateCcontent />} />
          <Route path="/buildui" element={<BuildUI />} />
          <Route path="/public/:id" element={<Public />} />
          <Route path="/nocodebuilder" element={<NoCodeBuilderDashboard />} />
          <Route path="/uicreator" element={<UICreator />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        {/* <ChatbotButton />  */}
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;