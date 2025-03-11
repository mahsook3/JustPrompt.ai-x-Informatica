import React from 'react';

const AdsHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col justify-center items-center p-4">
      
      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-8">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            <span className="block">We're</span>
            <span className="text-green-400">Coming Soon</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg">
            We're working hard to bring you our new AI-powered video ad platform. Stay tuned for a revolutionary way to create compelling video content.
          </p>
          
          {/* Email Signup */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
              <button className="px-6 py-3 bg-green-400 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
                Notify Me
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Be the first to know when we launch.</p>
          </div>
          
          {/* Features Preview */}
          <div className="pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What to Expect</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium text-gray-800">AI-Powered Templates</h4>
                  <p className="text-sm text-gray-600">Pre-built templates for quick video creation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium text-gray-800">Automated Content</h4>
                  <p className="text-sm text-gray-600">Let AI generate compelling ad content</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium text-gray-800">Analytics Dashboard</h4>
                  <p className="text-sm text-gray-600">Track campaign performance in real-time</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium text-gray-800">Audience Targeting</h4>
                  <p className="text-sm text-gray-600">Optimize ads for your specific audience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-white">
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <svg className="h-32 w-32 text-white opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 h-32 w-32 bg-green-400 opacity-20 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -left-4 h-32 w-32 bg-green-400 opacity-20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsHome;