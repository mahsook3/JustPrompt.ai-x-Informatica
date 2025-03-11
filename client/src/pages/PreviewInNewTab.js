import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PreviewInNewTab = () => {
  const [finalCode, setFinalCode] = useState("");
  const [finalCss, setFinalCss] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [view, setView] = useState("desktop"); // State to manage the current view
  const [userDetails, setUserDetails] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // Add this line
  const iframeRef = useRef(null);

  useEffect(() => {
    const previewData = JSON.parse(localStorage.getItem("previewData"));
    if (previewData) {
      setFinalCode(previewData.finalCode);
      setFinalCss(previewData.finalCss);
    }
  }, []);

  useEffect(() => {
    if (iframeRef.current && finalCode) {
      const doc = iframeRef.current.contentDocument;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Published Page</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>${finalCss}</style>
        </head>
        <body>
          <div id="htmlContent">${finalCode}</div>
        </body>
        </html>
      `);
      doc.close();
    }
  }, [finalCode, finalCss]);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get('https://free-ap-south-1.cosmocloud.io/development/api/userdetails', {
        params: {
          email: email,
          limit: 10,
          offset: 0
        },
        headers: {
          projectId: '66dc452ca54723b1c14ba1e9',
          environmentId: '66dc452ca54723b1c14ba1ea'
        }
      });

      if (response.data && response.data.data.length > 0) {
        const apiUser = response.data.data[0];
        if (apiUser.email === email) {
          console.log("_id from API: ", apiUser._id);
          setUserDetails(apiUser);
          //store the user details in local storage
          localStorage.setItem('userDetails', JSON.stringify(apiUser));
          console.log("User Details: ", apiUser);
        } else {
          setShowProfile(true);
        }
      } else {
        setShowProfile(true);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setShowProfile(true);
    }
  };

  const handleMakeItPublic = async () => {
    const questionnaireData = JSON.parse(localStorage.getItem("questionnaireData"));
    const workplaceUrl = questionnaireData?.workplaceUrl;
    const goal = questionnaireData?.goal;
    const userEmail = localStorage.getItem("userEmail");

    if (questionnaireData && workplaceUrl && goal && userEmail) {
      await fetchUserDetails(userEmail);

      const data = {
        title: workplaceUrl,
        description: goal,
        code: finalCode
      };

      const headers = {
        'environmentId': '66dc452ca54723b1c14ba1ea',
        'projectId': '66dc452ca54723b1c14ba1e9',
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.post('https://free-ap-south-1.cosmocloud.io/development/api/justpromptclientmodel', data, { headers });
        const publishedId = response.data.id;
        const publishedUrl = `https://justprompt-public.vercel.app/?id=${publishedId}`;
        setPublishedUrl(publishedUrl);

        if (document.hasFocus()) {
          navigator.clipboard.writeText(publishedUrl).then(() => {
            toast.success('Published successfully! URL copied to clipboard.');
          }).catch(err => {
            console.error('Failed to copy URL to clipboard:', err);
            toast.success(`Published successfully! URL: ${publishedUrl}`);
          });
        } else {
          toast.success(`Published successfully! URL: ${publishedUrl}`);
        }

        // Update user details with the new product information
        if (userDetails) {
          const updatedUserDetails = {
            ...userDetails,
            liveProducts: userDetails.liveProducts ? [...userDetails.liveProducts, {
              productID: publishedId,
              version: "1.0.0"
            }] : [{
              productID: publishedId,
              version: "1.0.0"
            }]
          };

          await axios.patch(`https://free-ap-south-1.cosmocloud.io/development/api/userdetails/${userDetails._id}`, updatedUserDetails, { headers });
          localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
          console.log('User details updated successfully:', updatedUserDetails);
        }
      } catch (error) {
        console.error('Error making it public:', error);
        toast.error('Failed to publish.');
      }
    } else {
      console.error('Required data is missing from localStorage');
      toast.error('Required data is missing from localStorage');
    }
  };

  const getIframeSize = () => {
    switch (view) {
      case "mobile":
        return { width: "375px", height: "667px" }; // iPhone 6/7/8 size
      case "tablet":
        return { width: "768px", height: "calc(100vh - 60px)" }; // Adjust height to avoid overlap with header
      case "desktop":
      default:
        return { width: "100%", height: "calc(100vh - 60px)" }; // Default size
    }
  };

  return (
    <>
      <div className="">
        <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden m-5 h-screen flex flex-col">
          <div className="flex justify-between items-center p-5 bg-white border-b border-gray-300">
            <div>
              <button 
                onClick={() => setView("mobile")}
                style={{ 
                  padding: "5px 10px", 
                  margin: "0 5px", 
                  backgroundColor: view === "mobile" ? "#2f855a" : "#40dc8b", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  transition: "background-color 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2f855a"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = view === "mobile" ? "#2f855a" : "#40dc8b"}
              >
                <i className="fas fa-mobile-alt"></i>
              </button>
              <button 
                onClick={() => setView("tablet")}
                style={{ 
                  padding: "5px 10px", 
                  margin: "0 5px", 
                  backgroundColor: view === "tablet" ? "#2f855a" : "#40dc8b", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  transition: "background-color 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2f855a"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = view === "tablet" ? "#2f855a" : "#40dc8b"}
              >
                <i className="fas fa-tablet-alt"></i>
              </button>
              <button 
                onClick={() => setView("desktop")}
                style={{ 
                  padding: "5px 10px", 
                  margin: "0 5px", 
                  backgroundColor: view === "desktop" ? "#2f855a" : "#40dc8b", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  transition: "background-color 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2f855a"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = view === "desktop" ? "#2f855a" : "#40dc8b"}
              >
                <i className="fas fa-desktop"></i>
              </button>
            </div>
            <button
              onClick={handleMakeItPublic}
              className="px-2.5 py-1 bg-green-400 text-white border-none rounded cursor-pointer transition-colors duration-300 hover:bg-green-600"
            >
              Publish
            </button>
          </div>
          <div className="text-black p-4 bg-gray-100 flex justify-center items-center h-[calc(100vh-60px)]">
            <iframe
              ref={iframeRef}
              className="border-none bg-white text-black m-2.5"
              style={getIframeSize()}
              title="Preview"
            />
          </div>
        </div>
        {publishedUrl && (
          <p className="mt-2.5 text-green-400">
            Published URL: <a href={publishedUrl} target="_blank" rel="noopener noreferrer">{publishedUrl}</a>
          </p>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default PreviewInNewTab;