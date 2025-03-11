import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const CompanyHtmlContent = () => {
  const { workplaceUrl } = useParams();
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching HTML for workplaceUrl: ${workplaceUrl}`);
        const response = await axios.get(
          `http://localhost:4000/api/companies/html/${workplaceUrl}`
        );
        console.log("API response:", response);
        setHtmlContent(response.data.html);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workplaceUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return <div className="tailwind-content">{parse(htmlContent)}</div>;
};

export default CompanyHtmlContent;
