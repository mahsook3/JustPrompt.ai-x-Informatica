import React, { useState } from 'react';

const allNodeTypes = [
  { id: 'terminal', label: 'Terminal', shape: 'oval' },
  { id: 'process', label: 'Process', shape: 'rectangle' },
  { id: 'decision', label: 'Decision', shape: 'diamond' },
  { id: 'inputOutput', label: 'Input/Output', shape: 'parallelogram' },
  { id: 'document', label: 'Document', shape: 'document' },
  { id: 'image', label: 'Image', shape: 'rectangle' },
  { id: 'techStack', label: 'Tech Stack', shape: 'rectangle' },
  { id: 'users', label: 'Users', shape: 'rectangle' },
  { id: 'theme', label: 'Theme', shape: 'rectangle' },
  { id: 'features', label: 'Features', shape: 'rectangle' },
  { id: 'Front-End Templates', label: 'HTML Code Block', shape: 'rectangle' },
  { id: 'dataExtraction', label: 'Data Extraction', shape: 'rectangle' },
  { id: 'externalIntegration', label: 'Integration with External Systems', shape: 'rectangle' },
  { id: 'database', label: 'Database', shape: 'rectangle' },
  { id: 'loop', label: 'Loop', shape: 'parallelogram' },
  { id: 'file', label: 'File', shape: 'document' },
  { id: 'api', label: 'API', shape: 'rectangle' },
  { id: 'function', label: 'Function', shape: 'rectangle' },
  { id: 'cloud', label: 'Cloud', shape: 'rectangle' },
  { id: 'mobile', label: 'Mobile', shape: 'rectangle' },
  { id: 'web', label: 'Web', shape: 'rectangle' },
  { id: 'server', label: 'Server', shape: 'rectangle' },
  { id: 'client', label: 'Client', shape: 'rectangle' },
  { id: 'network', label: 'Network', shape: 'rectangle' },
  { id: 'security', label: 'Security', shape: 'rectangle' },
  { id: 'testing', label: 'Testing', shape: 'rectangle' },
  { id: 'deployment', label: 'Deployment', shape: 'rectangle' },
  { id: 'monitoring', label: 'Monitoring', shape: 'rectangle' },
  { id: 'automation', label: 'Automation', shape: 'rectangle' },
  { id: 'analytics', label: 'Analytics', shape: 'rectangle' },
  { id: 'reporting', label: 'Reporting', shape: 'rectangle' },
  { id: 'visualization', label: 'Visualization', shape: 'rectangle' },
  { id: 'dashboard', label: 'Dashboard', shape: 'rectangle' },
  { id: 'notification', label: 'Notification', shape: 'rectangle' },
  { id: 'alert', label: 'Alert', shape: 'rectangle' },
  { id: 'log', label: 'Log', shape: 'rectangle' },
  { id: 'backup', label: 'Backup', shape: 'rectangle' },
  { id: 'restore', label: 'Restore', shape: 'rectangle' },
  { id: 'upgrade', label: 'Upgrade', shape: 'rectangle' },
  { id: 'downgrade', label: 'Downgrade', shape: 'rectangle' },
  { id: 'rollback', label: 'Rollback', shape: 'rectangle' },
  { id: 'migration', label: 'Migration', shape: 'rectangle' },
  { id: 'integration', label: 'Integration', shape: 'rectangle' }
];

const getNodeStyle = (shape) => {
  switch (shape) {
    case 'oval':
      return { borderRadius: '50px' };
    case 'rectangle':
      return {};
    case 'diamond':
      return { transform: 'rotate(45deg)', width: '100px', height: '100px' };
    case 'parallelogram':
      return { transform: 'skew(20deg)' };
    case 'document':
      return { border: '1px solid #ddd', padding: '10px' };
    default:
      return {};
  }
};

export default function TypesOfNodes() {
  const [searchQuery, setSearchQuery] = useState('');

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const getFilteredNodes = () => {
    return allNodeTypes.filter(node => node.label.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const renderNodes = (nodes) => (
    nodes.map((node) => (
      <div
        key={node.id}
        onDragStart={(event) => onDragStart(event, node.id)}
        draggable
        style={{
          margin: '10px 10px 40px 10px',
          padding: '10px',
          border: '1px solid #ddd',
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '150px', // Fixed width for nodes
          wordWrap: 'break-word', // Wrap text to next line if too long
          backgroundColor: '#ffffff', // Background color set to white
          ...getNodeStyle(node.shape),
        }}
      >
        <div style={node.shape === 'diamond' ? { transform: 'rotate(-45deg)' } : {}}>
          {node.label}
        </div>
      </div>
    ))
  );

  return (
    <div style={{ padding: '10px', borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', opacity: 0.8, backgroundImage: 'radial-gradient(#9898a0 0.5px, #ffffff 0.5px)', backgroundSize: '10px 10px', width: '200px' }}>
      <div className="mt-5 mb-5 mx-auto max-w-md py-1 px-3 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
        <input
          type="text"
          placeholder="Search for nodes..."
          className="bg-transparent w-full focus:outline-none pr-2 font-semibold border-0 focus:ring-0 px-0 py-0"
          name="topic"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flex: 1, 
        overflowY: 'auto', 
        scrollbarWidth: 'thin',
        msOverflowStyle: 'none' 
      }}>
        <style>
          {`
            div::-webkit-scrollbar {
              width: 4px; 
            }
            div::-webkit-scrollbar-thumb {
              background-color: darkgrey; /* Color of the scrollbar thumb */
              border-radius: 10px; /* Rounded corners */
            }
          `}
        </style>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {renderNodes(getFilteredNodes())}
        </div>
      </div>
    </div>
  );
}