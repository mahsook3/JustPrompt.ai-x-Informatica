import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Ship, 
  MapPin, 
  Layers, 
  FileCheck, 
  BarChart3, 
  Receipt, 
  Repeat, 
  Building, 
  FileText,
  CircleCheckBig,
  Circle
} from 'lucide-react';

const ExportGuide = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const categories = [
    { 
      title: 'How to Start Export',
      icon: <Ship size={24} />,
      responsegot: true,
      tabId: 'start',
      keywords: 'begin export business startup registration documentation iec code process steps guide initiate commence exporter license help'
    },
    { 
      title: 'Local Products & Origin',
      icon: <MapPin size={24} />,
      responsegot: Boolean(sessionStorage.getItem('local')),
      tabId: 'local',
      keywords: 'domestic products local origin manufacturing source certificate coo made in india regional goods merchandise production'
    },
    { 
      title: 'Product Category',
      icon: <Layers size={24} />,
      responsegot: Boolean(sessionStorage.getItem('ProductCategoryAndComplianceRequirement')),
      tabId: 'product',
      keywords: 'classification hs code product type category harmonized system commodity goods item merchandise export items'
    },
    { 
      title: 'Compliance Requirement',
      icon: <FileCheck size={24} />,
      responsegot: true,
      tabId: 'compliance',
      keywords: 'regulations rules standards requirements compliance legal certification permits licenses documents approval authorization'
    },
    { 
      title: 'RoDTEP',
      icon: <Receipt size={24} />,
      responsegot: Boolean(sessionStorage.getItem('hsnGstData')),
      tabId: 'hsn',
      keywords: 'remission duties taxes exported products scheme rebate tax refund export benefits incentives rodtep rates calculation'
    },
    { 
      title: 'Market Analysis',
      icon: <BarChart3 size={24} />,
      responsegot: true,
      tabId: 'market',
      keywords: 'research trends demand statistics data analysis market study competitors pricing international trade reports insights'
    },
    { 
      title: 'GST Details',
      icon: <Receipt size={24} />,
      responsegot: Boolean(sessionStorage.getItem('gstDetails')),
      tabId: 'gst',
      keywords: 'goods services tax gst rates input credit return filing taxation invoice igst customs duty'
    },
    { 
      title: 'Duty Drawback',
      icon: <Repeat size={24} />,
      responsegot: Boolean(sessionStorage.getItem('dutyDrawbackData')),
      tabId: 'duty',
      keywords: 'customs duty refund drawback scheme rates benefits tax rebate import duty return reimbursement'
    },
    { 
      title: 'Promotion Councils',
      icon: <Building size={24} />,
      responsegot: Boolean(sessionStorage.getItem('exportcouncil')),
      tabId: 'export',
      keywords: 'export promotion council trade associations organizations support assistance guidance epcs federation chambers'
    },
    { 
      title: 'Required Documents',
      icon: <FileText size={24} />,
      responsegot: true,
      tabId: 'documents',
      keywords: 'documentation paperwork certificates forms requirements shipping bill invoice packing list export documents'
    },
  ];

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.keywords.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery]);

  const handleCategoryClick = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2" id="Translatable">International Smart Business Guide</h1>
          <p className="text-lg text-green-600 mb-10" id="Translatable">Everything you need to start and grow your export business</p>
        </div>
        
        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-green-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border-2 border-green-300 rounded-xl focus:ring-green-500 focus:border-green-500 shadow-md bg-white text-green-900 placeholder-green-400"
              placeholder="Search for export information..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {(searchQuery ? filteredCategories : categories).map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-green-100 hover:border-green-300 cursor-pointer group relative"
              onClick={() => handleCategoryClick(category.tabId)}
            >
              {/* Status indicator */}
              <div className="absolute top-2 right-2">
                {category.responsegot ? (
                  <CircleCheckBig className="text-green-500" size={20} />
                ) : (
                  <Circle className="text-green-500" size={20} />
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-400 transition-colors duration-300">
                    <div className="text-green-600 group-hover:text-white transition-colors duration-300">
                      {category.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-center text-lg font-medium text-green-800 group-hover:text-green-600 transition-colors duration-300" id="Translatable">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center mt-8 text-gray-500" id="Translatable">
            No categories found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportGuide;