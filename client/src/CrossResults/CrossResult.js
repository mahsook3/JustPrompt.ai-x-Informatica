import * as React from 'react';
import { 
  Home, Globe, BarChart2, FileText, HelpCircle, 
  Edit3, FileCheck, MapPinned, Users, PanelRightOpen, 
  PanelRightClose, Hash , Ship, Layers
} from 'lucide-react';
import './styles.css';

import ProductCategoryAndComplianceRequirements from "./ProductCategoryAndComplianceRequirements";
import HarmonizedSystemOfNomenclature from "./HarmonizedSystemOfNomenclature";
import Market from "./Market";
import DutyDrawback from "./DutyDrawback";
import DocumentationGenerator from "./Documentation";
import Dashhome from "./Dashhome";
import Documentation from "../Documentation/Documentation";
import InputForm from './InputForm';
import ComplianceRequirements from './ComplianceRequirements';
import GSTdetails from './GSTdetails';
import ExportPromotionCouncils from './ExportPromotionCouncils';
import LocalProducts from './LocalProducts';
import Header from './Header';
import ExportGuide from './ExportGuide';
import Account from '../ParentDashboard/Account';

const CrossResult = ({ setActiveComponent }) => {
  const [activeTab, setActiveTab] = React.useState('input');
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Menu items configuration
  const menuItems = {
    details: [
      { id: 'home', icon: Home, label: 'Product Details' }
    ],
    analysis: [
      { id: 'product', icon: Layers, label: 'Product Category' },
      { id: 'compliance', icon: FileCheck, label: 'Compliance Requirement' },
      { id: 'hsn', icon: Hash, label: 'HSN GST, RoDTEP' },
      { id: 'market', icon: Globe, label: 'Market Analysis' },
    ],
    getstart: [
      { id: 'getstart', icon: HelpCircle, label: 'Get Start' },
      { id: 'start', icon: Ship, label: 'How to Start Export' },
      { id: 'local', icon: MapPinned, label: 'Local Products & Origin' },
    ],
    financial: [
      { id: 'gst', icon: Hash, label: 'GST Details' },
      { id: 'duty', icon: BarChart2, label: 'Duty Drawback' },
    ],
    communities: [{ id: 'export', icon: Users, label: 'Promotion Councils' }],
    documentation: [{ id: 'documents', icon: FileText, label: 'Required Documents' }],
    input: [{ id: 'input', icon: Edit3, label: 'Product Details' }],
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'product': return <ProductCategoryAndComplianceRequirements setActiveTab={setActiveTab} />;
      case 'getstart': return <ExportGuide setActiveTab={setActiveTab} />;
      case 'local': return <LocalProducts setActiveTab={setActiveTab} />;
      case 'hsn': return <HarmonizedSystemOfNomenclature setActiveTab={setActiveTab} />;
      case 'market': return <Market setActiveTab={setActiveTab} />;
      case 'gst': return <GSTdetails setActiveTab={setActiveTab} />;
      case 'duty': return <DutyDrawback setActiveTab={setActiveTab} />;
      case 'account': return <Account setActiveTab={setActiveTab} />;
      case 'start': return <Documentation />;
      case 'documents': return <DocumentationGenerator />;
      case 'export': return <ExportPromotionCouncils setActiveTab={setActiveTab} />;
      case 'help': return <Documentation />;
      case 'compliance': return <ComplianceRequirements setActiveTab={setActiveTab} />;
      case 'input':
      default: return <InputForm setActiveTab={setActiveTab} />;
    }
  };

const renderNavSection = (title, items) => (
  <div className="mb-6 z-10">
    {isExpanded && (
      <div className="px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
      </div>
    )}
    {items.map(item => (
      <div key={item.id} className="group">
        <button
          className={`flex items-center w-full px-4 py-3 transition-all duration-200 rounded-lg mx-1 ${
            activeTab === item.id
              ? 'bg-green-100 text-green-600 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          } ${!isExpanded ? 'justify-center' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon className={`w-5 h-5 ${isExpanded ? 'hidden' : ''}`} />
          {isExpanded && <span>{item.label}</span>}
        </button>
      </div>
    ))}
  </div>
);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`bg-white shadow-lg h-full overflow-y-auto transition-all duration-300 flex flex-col border-r border-gray-200 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isExpanded && (
            <div className="text-lg font-bold text-gray-800" id="Translatable">Business Advisor</div>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? 
              <PanelRightOpen className="w-5 h-5" /> : 
              <PanelRightClose className="w-5 h-5" />
            }
          </button>
        </div>
        <nav className="flex-1 pt-5 pb-4 overflow-y-auto p-2">
          {renderNavSection('INPUT', menuItems.input)}
          {renderNavSection('Get Start', menuItems.getstart)}
          {renderNavSection('ANALYSIS', menuItems.analysis)}
          {renderNavSection('FINANCIAL', menuItems.financial)}
          {renderNavSection('COMMUNITIES', menuItems.communities)}
          {renderNavSection('DOCUMENTATION', menuItems.documentation)}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Header setActiveTab={setActiveTab} setActiveComponent={setActiveComponent} />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrossResult;