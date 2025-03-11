import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import BuildUI from './BuildUI';
import { motion } from "framer-motion"

export default function GenerateCcontent({ formData }) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [validationResult, setValidationResult] = useState('');
  const [correctionStatus, setCorrectionStatus] = useState('');
  const [showBuildUI, setShowBuildUI] = useState(false);

  useEffect(() => {
    if (formData.businessName && formData.businessDescription) {
      const requests = [];

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "Hero",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          hero: {
            title: "Main Title of the hero section",
            subtitle: "Short Description about the page",
            primarybutton: {
              text: "primary button text",
              href: "javascript:void(0)"
            },
            secondarybutton: {
              text: "secondary button text",
              href: "javascript:void(0)"
            }
          }
        })
      );

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "Stats",
          company: formData.businessName,
          moredetails: `${formData.businessDescription} ${formData.statistics}`,
          stats: [
            { value: "50+", label: "Dishes" },
            { value: "1000+", label: "Happy Customers" },
            { value: "5", label: "Years in Service" },
            { value: "20+", label: "Chefs" }
          ]
        })
      );

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "features",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          features: {
            title: "Title of feature",
            subtitle: "description of feature",
            features: [
              {
                icon: "relavent icons from google icons i.e, restaurant_menu",
                title: "Title of feature 1",
                description: "description of feature 1"
              },
              {
                icon: "relavent icons from google icons i.e, local_dining",
                title: "Title of feature 2",
                description: "description of feature 2"
              },
              {
                icon: "relavent icons from google icons i.e,  delivery_dining",
                title: "Title of feature 3",
                description: "description of feature 3"
              }
            ]
          }
        })
      );

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "aboutUs",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          aboutUs: {
            image: {
              src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
              alt: "About Us Image"
            },
            title: "About company",
            subtitle: "description of title",
            description: "short description of business",
            linkText: "primary button"
          }
        })
      );

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "cta",
          company: formData.businessName,
          moredetails: formData.businessDescription,
          cta: {
            title: "title of CTA",
            description: "description of CTA",
            buttons: [
              {
                text: "Primary button",
                href: "javascript:void(0)"
              },
              {
                text: "Secondary button",
                href: "javascript:void(0)"
              }
            ]
          }
        })
      );

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "testimonialsSection",
          company: formData.businessName,
          moredetails: `${formData.businessDescription} ${formData.testimonials}`,
          testimonialsSection: {
            title: "What Our Customers Say",
            description: "Hear from our satisfied customers about their experience with ShopeEase.",
            testimonials: [
              {
                avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
                name: "Ravi Kumar",
                title: "Software Engineer",
                quote: "ShopeEase brings the taste of home to my doorstep. The food is delicious and authentic."
              },
              {
                avatar: "https://randomuser.me/api/portraits/women/79.jpg",
                name: "Priya Sharma",
                title: "Graphic Designer",
                quote: "I love the variety of dishes offered by ShopeEase. It's like having a home-cooked meal every day."
              },
              {
                avatar: "https://randomuser.me/api/portraits/men/86.jpg",
                name: "Amit Patel",
                title: "Entrepreneur",
                quote: "The quality and taste of the food from ShopeEase are unmatched. Highly recommended!"
              }
            ]
          }
        })
      );

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "footer",
          company: formData.businessName,
          moredetails: `${JSON.stringify(formData.businessDescription)} ${JSON.stringify(formData.socialMediaLinks)} ${JSON.stringify(formData.sections)}`,
          footer: {
            description: "description of my business",
            companyName: "Company Name",
            sections: [
              {
                title: "Section1",
                href: "#Section1"
              },
              {
                title: "Section2",
                href: "#Section2"
              },
              {
                title: "Section3",
                href: "#Section3"
              },
              {
                title: "Section4",
                href: "Section4"
              }
            ],
            contact: {
              description: "Reach out via email or follow us on social media.",
              email: "contact@yourwebsite.com"
            },
            socialLinks: [
              {
                platform: "socialName1",
                href: "#socialLinks1",
                iconName: "relavent icons from google icons i.e, facebook"
              },
              {
                platform: "socialName2",
                href: "#socialLinks2",
                iconName: "relavent icons from google icons i.e, twitter"
              }
            ]
          }
        })
      );

      requests.push(
        axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/generate-content', {
          section: "navigation",
          company: formData.businessName,
          moredetails: formData.sections,
          navigation: [
            { title: "Section 1", path: "javascript:void(0)" },
            { title: "Section 2", path: "javascript:void(0)" },
            { title: "Section 3", path: "javascript:void(0)" },
            { title: "Section 4", path: "javascript:void(0)" }
          ]
        })
      );

      Promise.all(requests)
        .then(responses => {
          const combinedContent = {
            theme: {
              dark: formData.theme === 'Dark',
              primaryColor: formData.themeColor
            },
            navigation: responses[7].data.navigation,
            hero: responses[0].data.hero,
            stats: responses[1].data.stats,
            features: responses[2].data.features,
            aboutUs: responses[3].data.aboutUs,
            cta: responses[4].data.cta,
            testimonialsSection: responses[5].data.testimonialsSection,
            footer: responses[6].data.footer,
            products: parseCSVData(formData.csvData),
            logo: {
              src: formData.logoUrl,
              width: 100,
              height: 100,
              alt: formData.businessName
            },
            brands: formData.sections.includes("Customer Brand") ? [
              { src: "https://placehold.co/600x400?text=Brand+1", alt: "Brand 1" },
              { src: "https://placehold.co/600x400?text=Brand+2", alt: "Brand 2" },
              { src: "https://placehold.co/600x400?text=Brand+3", alt: "Brand 3" },
              { src: "https://placehold.co/600x400?text=Brand+4", alt: "Brand 4" },
              { src: "https://placehold.co/600x400?text=Brand+5", alt: "Brand 5" }
            ] : null
          };
          setContent(combinedContent);
          validateAndCorrectJSON(combinedContent);
          setShowBuildUI(true); // Show BuildUI component
        })
        .catch(error => {
          console.error("There was an error generating the content!", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [formData]);

  function parseCSVData(csvData) {
    const parsedData = Papa.parse(csvData.join('\n'), { header: true }).data;
    return parsedData.map(row => ({
      id: parseInt(row.id, 10),
      name: row.name,
      price: parseFloat(row.price),
      rating: parseFloat(row.rating),
      image: row.image,
      category: row.category || '',
      minOrder: parseInt(row.minOrder, 10),
      isNew: row.isNew === 'true',
      discount: row.discount || '',
      originalPrice: row.originalPrice ? parseFloat(row.originalPrice) : 0
    }));
  }

  function validateAndCorrectJSON(data) {
    const validationErrors = []; // Placeholder for validation errors
    if (validationErrors.length === 0) {
      setValidationResult("Valid JSON");
      setCorrectionStatus("All sections are valid.");
    } else {
      setValidationResult(`Invalid JSON:\n${validationErrors.join('\n')}`);
      correctJSONSections(validationErrors, data);
    }
  }

  async function correctJSONSections(errors, data) {
    for (const error of errors) {
      if (typeof error === 'string') {
        const sectionMatch = error.match(/at \.(\w+)/);
        if (sectionMatch) {
          const section = sectionMatch[1];
          const response = await axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/correct-content', {
            error,
            [section]: data[section]
          });
          data[section] = response.data[section];
        }
      }
    }
    setContent(data);
    setCorrectionStatus("All sections have been corrected.");
  }

  console.log("content", content);

  return (
    <div>
      {showBuildUI ? (
        <BuildUI content={content} />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative">
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="w-48 h-48 bg-green-200 rounded-full" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-300 rounded-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-300 rounded-full" />
            </motion.div>

            <motion.div
              className="flex flex-col items-center space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-4xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  className="inline-block text-green-400"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  Just
                </motion.span>
                <motion.span
                  className="inline-block text-gray-700"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
                >
                  Prompt.ai
                </motion.span>
              </motion.p>
              <motion.div
                className="flex space-x-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                  />
                ))}
              </motion.div>

              {/* New loading bar */}
              <motion.div
                className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  className="h-full bg-green-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}