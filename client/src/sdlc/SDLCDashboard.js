import React from "react";
import Options from "./Options";
import CodeDisplay from "./CodeDisplay";
import Tabs from "./Tabs";

export default function SDLCDashboard() {
  return (
    <>
      <div className="flex h-screen">
       
        <div
          className="flex-none"
          style={{ width: "55.27%", overflowY: "auto" }}
        >
          <Options />
        </div>
        <div
          className="flex-none"
          style={{
            width: "40%",
            overflowY: "auto",
            backgroundColor: "#ffffff",
            opacity: 0.8,
          }}
        >
          <Tabs />
        </div>
      </div>
    </>
  );
}
