import React, { useState, useEffect } from "react";

const Github = ({ setGithubData }) => {
  const [githubUrl, setGithubUrl] = useState("");
  const [repoDetails, setRepoDetails] = useState({ owner: "", repo: "" });
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState("");
  const [fileContent, setFileContent] = useState(null);

  const localStorageKey = "githubData";

  // Utility function to handle localStorage
  const storeData = (key, value) => {
    if (key === "githubUrl") return; // Exclude githubUrl from being stored
    const data = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    data[key] = value;
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    setGithubData(data); // Update parent component with new data
  };

  const getData = (key) => {
    const data = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    return data[key];
  };

  // Load the GitHub URL from localStorage on mount
  useEffect(() => {
    const storedUrl = getData("githubUrl");
    if (storedUrl) {
      setGithubUrl(storedUrl);
      parseGithubUrl(storedUrl);
    }
  }, []);

  const parseGithubUrl = (url) => {
    try {
      const match = url.match(/github\.com\/(\w+)\/(\w+)/);
      if (match) {
        const [_, owner, repo] = match;
        setRepoDetails({ owner, repo });
        storeData("repoDetails", { owner, repo });
        fetchFiles(owner, repo, "");
      } else {
        alert("Invalid GitHub URL");
      }
    } catch (error) {
      console.error("Error parsing URL:", error);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    parseGithubUrl(githubUrl);
  };

  const fetchFiles = async (owner, repo, directoryPath) => {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${directoryPath}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
        setPath(directoryPath);
        setFileContent(null); // Clear file content when navigating directories
        storeData("files", data);
        storeData("path", directoryPath);
      } else {
        console.error("Error fetching files:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const fetchFileContent = async (owner, repo, filePath) => {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const content = atob(data.content); // Decode base64 content
        storeData(filePath, content); // Store in localStorage
        setFileContent(content);
      } else {
        console.error("Error fetching file content:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  const navigateTo = (item) => {
    if (item.type === "dir") {
      fetchFiles(repoDetails.owner, repoDetails.repo, item.path);
    } else {
      fetchFileContent(repoDetails.owner, repoDetails.repo, item.path);
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">GitHub File Explorer</h1>
      <form onSubmit={handleUrlSubmit} className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter GitHub Repository URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Load
        </button>
      </form>

      {files.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Path: {path || "/"}</h2>
          <ul className="bg-white shadow rounded divide-y divide-gray-200">
            {files.map((file) => (
              <li
                key={file.sha}
                className="p-4 flex items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => navigateTo(file)}
              >
                {file.type === "dir" ? (
                  <span className="text-yellow-500 mr-2">📁</span>
                ) : (
                  <span className="text-gray-500 mr-2">📄</span>
                )}
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {fileContent && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">File Content</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {fileContent}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Github;