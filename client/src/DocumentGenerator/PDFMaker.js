import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "tailwindcss/tailwind.css";

export default function PDFMaker({ githubData }) {
  const targetRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (githubData) {
        try {
          const response = await fetch("http://localhost:8000/generate-docs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ githubdata: githubData }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      } else {
        console.error("Please load GitHub data by URL.");
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Check for updates every 5 seconds

    return () => clearInterval(interval);
  }, [githubData]);

  const generatePDF = async () => {
    if (!targetRef.current) {
      console.error("Target element is not available.");
      return;
    }

    const canvas = await html2canvas(targetRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;

    pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
    pdf.save("documentation.pdf");
  };

  if (!data) {
    return <div>Please load github repo Details </div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={generatePDF}
          className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Download PDF
        </button>
        <div ref={targetRef} className="bg-white p-8 rounded-xl shadow-lg">
          {data.map((doc, index) => (
            <div key={index} className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 border-b-2 border-gray-200 pb-4">{doc.Title}</h1>
              <p className="mb-8 text-lg text-gray-600 text-center">{doc.Description}</p>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Installation</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-600">Requirements</h3>
                  <ul className="list-disc list-inside mb-4 text-gray-700">
                    {doc.Installation.Requirements.map((req, i) => (
                      <li key={i} className="mb-2">{req}</li>
                    ))}
                  </ul>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-600">Steps</h3>
                  <ol className="list-decimal list-inside text-gray-700">
                    {doc.Installation.Steps.map((step, i) => (
                      <li key={i} className="mb-2">{step}</li>
                    ))}
                  </ol>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Usage</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-600">Command Line</h3>
                  <p className="mb-4 text-gray-700">{doc.Usage.CommandLine}</p>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-600">API</h3>
                  {doc.Usage.API.Endpoints.map((endpoint, i) => (
                    <div key={i} className="mb-6 bg-white p-4 rounded-md shadow">
                      <p className="mb-2">
                        <strong className="text-gray-700">URL:</strong> <span className="text-blue-600">{endpoint.URL}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-gray-700">Method:</strong> <span className="text-green-600">{endpoint.Method}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-gray-700">Parameters:</strong>
                      </p>
                      <ul className="list-disc list-inside ml-4">
                        {Object.entries(endpoint.Parameters).map(([key, value], j) => (
                          <li key={j} className="text-gray-600">
                            <strong>{key}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2">
                        <strong className="text-gray-700">Example:</strong> <code className="bg-gray-100 p-1 rounded">{endpoint.Example}</code>
                      </p>
                    </div>
                  ))}
                  <h3 className="text-2xl font-semibold mb-3 text-gray-600">Usage Examples</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {doc.Usage.API.UsageExamples.map((example, i) => (
                      <li key={i} className="mb-2">{example}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Modules</h2>
                {doc.Modules.map((module, i) => (
                  <div key={i} className="mb-8 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-3 text-gray-600">{module.Name}</h3>
                    <p className="mb-4 text-gray-700">{module.Description}</p>
                    <h4 className="text-xl font-semibold mb-2 text-gray-600">Functions</h4>
                    <ul className="list-disc list-inside mb-4">
                      {module.Functions.map((func, j) => (
                        <li key={j} className="mb-2 text-gray-700">
                          <strong>{func.Name}:</strong> {func.Parameters.parameterName} - {func.Return}
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-xl font-semibold mb-2 text-gray-600">Classes</h4>
                    {module.Classes.map((cls, j) => (
                      <div key={j} className="mb-4">
                        <p className="mb-2 text-gray-700"><strong>{cls.Name}:</strong> {cls.Description}</p>
                        <ul className="list-disc list-inside ml-4">
                          {cls.Methods.map((method, k) => (
                            <li key={k} className="mb-1 text-gray-600">
                              <strong>{method.Name}:</strong> {method.Parameters.parameterName} - {method.Return}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Examples</h2>
                {doc.Examples.map((example, i) => (
                  <div key={i} className="mb-6 bg-gray-50 p-6 rounded-lg">
                    <p className="mb-2 text-gray-700"><strong className="text-gray-600">Scenario:</strong> {example.Scenario}</p>
                    <p className="mb-2"><strong className="text-gray-600">Code:</strong> <code className="bg-gray-100 p-2 block rounded mt-2 text-sm">{example.Code}</code></p>
                    <p><strong className="text-gray-600">Output:</strong> <span className="text-gray-700">{example.Output}</span></p>
                  </div>
                ))}
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Contributing</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {doc.Contributing.Guidelines.map((guideline, i) => (
                    <li key={i} className="mb-2">{guideline}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Testing</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {doc.Testing.Instructions.map((instruction, i) => (
                    <li key={i} className="mb-2">{instruction}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">License</h2>
                <p className="text-gray-700">{doc.License}</p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Acknowledgements</h2>
                <p className="text-gray-700">{doc.Acknowledgements}</p>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}