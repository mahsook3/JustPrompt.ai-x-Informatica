import React, { useCallback, useState, useEffect, useContext } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import TypesOfNodes from "./TypesofNodes";
import "../App.css";
import { ResponseContext } from "../sdlc/ResponseContext";
import "@xyflow/react/dist/style.css";
import { MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { BsStars } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";
import pdfToText from "react-pdftotext";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 0 },
    data: { label: "Terminal: Start" },
  },
  {
    id: "2",
    position: { x: 200, y: 100 },
    data: { label: "Tech Stack: Text here" },
  },
  {
    id: "3",
    position: { x: 100, y: 200 },
    data: { label: "Users: Text here" },
  },
  {
    id: "4",
    position: { x: 200, y: 300 },
    data: { label: "Features: Text here" },
  },
  {
    id: "5",
    position: { x: 100, y: 400 },
    data: { label: "File: Text here" },
  },
  {
    id: "6",
    position: { x: 200, y: 500 },
    data: { label: "Theme: Text here" },
  },
  {
    id: "7",
    position: { x: 100, y: 600 },
    data: { label: "Database: Text here" },
  },
  {
    id: "8",
    position: { x: 200, y: 700 },
    data: { label: "Terminal: End" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e6-7", source: "6", target: "7" },
  { id: "e7-8", source: "7", target: "8" },
];




const nodeLabels = {
  terminal: "Terminal: Text here",
  process: "Process: Text here",
  decision: "Decision: Text here",
  image: "Image: Text here",
  inputOutput: "Input/Output: Text here",
  techStack: "Tech Stack: Text here",
  users: "Users: Text here",
  theme: "Theme: Text here",
  features: "Features: Text here",
  document: "Document: Text here",
  "Front-End Templates": "HTML Code Block: Text here",
  dataExtraction: "Data Extraction: Text here",
  externalIntegration: "Integration with External Systems: Text here",
  database: "Database: Text here",
  loop: "Loop: Text here",
  file: "File: Text here",
  api: "API: Text here",
  function: "Function: Text here",
  cloud: "Cloud: Text here",
  mobile: "Mobile: Text here",
  web: "Web: Text here",
  server: "Server: Text here",
  client: "Client: Text here",
  network: "Network: Text here",
  security: "Security: Text here",
  testing: "Testing: Text here",
  deployment: "Deployment: Text here",
  monitoring: "Monitoring: Text here",
  automation: "Automation: Text here",
  analytics: "Analytics: Text here",
  reporting: "Reporting: Text here",
  visualization: "Visualization: Text here",
  dashboard: "Dashboard: Text here",
  notification: "Notification: Text here",
  alert: "Alert: Text here",
  log: "Log: Text here",
  backup: "Backup: Text here",
  restore: "Restore: Text here",
  upgrade: "Upgrade: Text here",
  downgrade: "Downgrade: Text here",
  rollback: "Rollback: Text here",
  migration: "Migration: Text here",
  integration: "Integration: Text here",
};

export default function Flowchart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [nonEditablePart, setNonEditablePart] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { response, setResponse } = useContext(ResponseContext);
  const [buttonText, setButtonText] = useState("Start Building");
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [fileName, setFileName] = useState('');

  const [isCreating, setIsCreating] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (nodeType, position) => {
      const newNode = {
        id: (nodes.length + 1).toString(),
        position,
        data: { label: nodeLabels[nodeType] || `Node ${nodes.length + 1}` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const editNode = useCallback(
    (id, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { label: newLabel } } : node
        )
      );
    },
    [setNodes]
  );

  const deleteNode = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges(initialEdges);
    },
    [setNodes, setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    const [nonEditable, editable] = node.data.label.split(": ");
    setNonEditablePart(nonEditable);
    setEditLabel(editable);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete" && selectedNode) {
        deleteNode(selectedNode.id);
        setSelectedNode(null);
      }
    },
    [selectedNode, deleteNode]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const storedFlowchart = localStorage.getItem("flowchartData");
    if (storedFlowchart) {
      const { nodes, edges } = JSON.parse(storedFlowchart);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [setNodes, setEdges]);

  const handleLabelChange = useCallback((event) => {
    setEditLabel(event.target.value);
  }, []);

  const handlePdfChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const extractedText = await extractTextFromPdf(file);
      setEditLabel(extractedText);
      setSelectedPdf(file); // Store the selected PDF file
    }
  };
  

  const truncateFileName = (name) => {
    if (name.length > 10) {
      return name.substring(0, 7) + '...';
    }
    return name;
  };

  const extractTextFromPdf = async (pdfFile) => {
    try {
      const text = await pdfToText(pdfFile);
      return text;
    } catch (error) {
      console.error("Failed to extract text from pdf", error);
      return "";
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      if (file.type === "application/pdf") {
        const extractedText = await extractTextFromPdf(file);
        setEditLabel(extractedText);
        setSelectedPdf(file);
      } else if (file.type.startsWith("image/")) {
        const imageUrl = await uploadImage(file);
        setEditLabel(imageUrl); // Update the input box with the image URL
        setSelectedImage(file);
      }
    }
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
  
    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=aea1014911ef618a11a303bcebf25ca7", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        console.error("Failed to upload image", data);
        return "";
      }
    } catch (error) {
      console.error("Failed to upload image", error);
      return "";
    }
  };

  const handleLabelSubmit = useCallback(async () => {
    if (selectedNode) {
      let newLabel = `${nonEditablePart}: ${editLabel}`;
      if (
        (selectedNode.data.label.startsWith("Document") ||
          selectedNode.data.label.startsWith("File") ||
          selectedNode.data.label.startsWith("Data Extraction")) &&
        selectedPdf
      ) {
        const extractedText = await extractTextFromPdf(selectedPdf);
        newLabel += ` ${extractedText}`;
      } else if (selectedNode.data.label.startsWith("Image") && selectedImage) {
        const imageUrl = await uploadImage(selectedImage);
        newLabel += ` ${imageUrl}`;
      }
      editNode(selectedNode.id, newLabel);
      setSelectedNode(null);
      setSelectedPdf(null);
      setSelectedImage(null);
    }
  }, [selectedNode, editLabel, nonEditablePart, editNode, selectedPdf, selectedImage]);
  

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");
      const reactFlowBounds = event.target.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      addNode(nodeType, position);
    },
    [addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleGenerateCode = useCallback(async () => {
    setButtonText("Please wait...");
    const nodeLabels = nodes.map((node) => node.data.label);
    const response = await fetch("https://genai-jp.onrender.com/generateProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ labels: nodeLabels }),
    });
    const data = await response.json();
    setResponse(data);
    setButtonText("Update it again");
    console.log(data);
  }, [nodes, setResponse]);

  const resetNodes = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    localStorage.removeItem("flowchartData");
  };

  const deleteNodes = () => {
    setNodes([]);
    setEdges([]);
    localStorage.removeItem("flowchartData");
  };

  const handleBsStarsClick = () => {
    setShowInputBox((prev) => !prev);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCreateClick = async () => {
    setIsCreating(true);
    try {
      const response = await fetch("https://genai-jp.onrender.com/generateFlowchart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompttoflow: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setNodes(data.nodes);
      setEdges(data.edges);
      localStorage.setItem("flowchartData", JSON.stringify(data));
      setShowInputBox(false);
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert(`Failed to fetch: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <TypesOfNodes />
      <div
        style={{ flexGrow: 1, position: "relative" }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {selectedNode && (
          <div
  className="mt-10 mx-auto py-2 px-6 rounded-full bg-gray-50 border flex items-center focus-within:border-gray-300"
  style={{
    zIndex: 10,
    position: "absolute",
    bottom: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
  }}
>
  <span className="font-semibold pr-2">{nonEditablePart}:</span>
  <input
    type="text"
    placeholder="Current text comes here"
    className="bg-transparent w-full focus:outline-none pr-4 border-0 focus:ring-0 px-0 py-0"
    name="topic"
    value={editLabel}
    onChange={handleLabelChange}
  />
{(selectedNode.data.label.startsWith("Document") || 
  selectedNode.data.label.startsWith("File") || 
  selectedNode.data.label.startsWith("Data Extraction")) ||
  selectedNode.data.label.startsWith("Image")
  
  && (
    <div className="flex items-center ml-2">
 
<label className="flex items-center cursor-pointer mr-2" title="Upload a file">
  {fileName ? truncateFileName(fileName) : <FaFileUpload />}
  <input
  type="file"
  accept="application/pdf,image/*"
  onChange={handleFileChange}
  style={{ display: 'none' }}
/>
</label>
    </div>
  )}
  <button
    className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white py-1.5 h-[38px] -mr-3"
    onClick={handleLabelSubmit}
  >
    Save
  </button>
</div>
        )}
        {showInputBox && (
          <div
            className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
            style={{
              zIndex: 10,
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
            }}
          >
            <input
              type="text"
              placeholder="Ask AI for flowchart"
              className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
              name="topic"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3"
              onClick={handleCreateClick}
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create"} <BsStars />
            </button>
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <button
        className="absolute top-4 right-4 bg-green-400 text-white px-4 py-2 rounded"
        onClick={handleGenerateCode}
        style={{ width: "20%" }} // Width relative to parent div
      >
        {buttonText}
      </button>
      <div className="absolute top-16 right-4 flex space-x-4">
        <button
          className="text-black px-4 py-2 rounded"
          onClick={resetNodes}
          style={{ width: "20%", backgroundColor: "transparent" }}
          title="Reset All" // Tooltip for reset button
        >
          <GrPowerReset />
        </button>
        <button
          className="text-black px-4 py-2 rounded"
          onClick={deleteNodes}
          style={{ width: "20%", backgroundColor: "transparent" }}
          title="Delete All" // Tooltip for delete button
        >
          <MdDelete />
        </button>
        <button
          className="text-black px-4 py-2 rounded"
          onClick={handleBsStarsClick}
          style={{ width: "20%", backgroundColor: "transparent" }}
          title="Genarate with AI" // Tooltip for handle stars button
        >
          <BsStars />
        </button>
      </div>
    </div>
  );
}