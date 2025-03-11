import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModelCreate from "./ModelCreate";

function extractDetails(connectionString) {
  const regex = /mongodb\+srv:\/\/(.*?):(.*?)@(.*?)\/(.*?)\?/;
  const match = connectionString.match(regex);

  if (match) {
    let username = match[1] || "Not provided";
    let password = match[2] || "Not provided";
    const clusterURL = match[3];
    const database = match[4] || "Not provided";

    if (username.includes("<")) username = "Not provided";
    if (password.includes("<")) password = "Not provided";

    return {
      username,
      password,
      clusterURL,
      database,
    };
  }

  return null;
}

export default function CredentialsForm() {
  const [connectionString, setConnectionString] = useState("");
  const [details, setDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clusterURL, setClusterURL] = useState("");
  const [database, setDatabase] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState(null);

  const handleExtractDetails = () => {
    const extractedDetails = extractDetails(connectionString);
    if (extractedDetails) {
      setUsername(extractedDetails.username);
      setPassword(extractedDetails.password);
      setClusterURL(extractedDetails.clusterURL);
      setDatabase(extractedDetails.database);
      toast.success("Details extracted successfully!");
    } else {
      toast.error("Failed to extract details. Please check your connection string.");
    }
    setDetails(extractedDetails);
  };

  const handleConnect = async () => {
    try {
      const response = await fetch('https://justprompt-baas.onrender.com/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, clusterURL, database }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setConnectionId(data._id);
        setIsConnected(true);
      } else {
        toast.error("Connection failed. Please provide correct credentials.");
      }
    } catch (error) {
      toast.error("An error occurred while connecting. Please try again.");
    }
  };

  if (isConnected) {
    return <ModelCreate connectionId={connectionId} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p4-10">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full px-6 py-8 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Database Connection
              </h2>
              <p className="mt-4 text-gray-600">
                Please enter your MongoDB connection string.
              </p>
              <div className="mb-6">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="mongodb+srv://<db_username>:<db_password>@cluster0.60b61di.mongodb.net/Demo?retryWrites=true&w=majority&appName=Cluster0"
                  value={connectionString}
                  onChange={(e) => setConnectionString(e.target.value)}
                />
                <button
                  className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  type="button"
                  onClick={handleExtractDetails}
                >
                  Extract Details
                </button>
              </div>
              {details && (
                <form className="mt-6">
                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="clusterURL"
                    >
                      Cluster URL
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="clusterURL"
                      type="text"
                      value={clusterURL}
                      onChange={(e) => setClusterURL(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-800 font-bold mb-2"
                      htmlFor="database"
                    >
                      Database
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="database"
                      type="text"
                      value={database}
                      onChange={(e) => setDatabase(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    type="button"
                    onClick={handleConnect}
                  >
                    Connect
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}