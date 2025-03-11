import React, { useState } from "react";

const HomePage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    company: {
      name: "",
      goal: "",
      logoUrl: "",
    },
    theme: {
      theme: "light",
      color: "",
    },
    header: {
      headerTemplateID: "",
      companyName: "",
      logoUrl: "",
      menuItems: [],
      actionButton: { label: "", link: "" },
    },
    hero: {
      heroTemplateID: "",
      topic: "",
      title: "",
      para: "",
      buttons: [],
      imageUrl: "",
    },
    features: {
      featuresTemplateID: "",
      title: "",
      description: "",
      items: [],
    },
    products: {
      productsTemplateID: "",
      list: [],
    },
    teamMembers: {
      teamMembersTemplateID: "",
      Members: [],
    },
    callToAction: {
      callToActionTemplateID: "",
      heading: "",
      subheading: "",
      buttonText: "",
      buttonText1: "",
    },
    footer: {
      footerTemplateID: "",
      companyName: "",
      companyDescription1: "",
      companyDescription2: "",
      contactsTitle: "",
      phoneLabel: "",
      phone: "",
      emailLabel: "",
      email: "",
      addressLabel: "",
      address: "",
      socialTitle: "",
      socialDescription: "",
      copyright: "",
      faq: "",
      privacyPolicy: "",
      termsAndConditions: "",
      icons: {
        company: "",
        twitter: "",
        instagram: "",
        facebook: "",
      },
    },
    websitedetails: {
      uniqueID: "",
    },
  });

  const handleInputChange = (section, field, value, index) => {
    if (index !== undefined) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: formData[section][field].map((item, i) =>
            i === index ? { ...item, ...value } : item
          ),
        },
      });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    }
  };

  const [showReview, setShowReview] = useState(false); // State to toggle between form and review

  // Function to toggle between form and review sections
  const toggleReview = () => {
    setShowReview(!showReview);
  };

  const addItem = (section, field) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: [...formData[section][field], {}],
      },
    });
  };

  const handleTemplateSelection = (section, templateID) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [`${section}TemplateID`]: templateID,
      },
    });
  };

  const templateSelectionImages = (section, templates) => (
    <div className="flex space-x-4 mb-4">
      {templates.map((template) => (
        <img
          key={template}
          src={`https://via.placeholder.com/150?text=${template}`}
          alt={template}
          className={`cursor-pointer border-2 ${
            formData[section][`${section}TemplateID`] === template
              ? "border-green-400"
              : "border-gray-300"
          }`}
          onClick={() => handleTemplateSelection(section, template)}
        />
      ))}
    </div>
  );

  const generateContent = async (section) => {
    const { name, goal, logoUrl } = formData.company;
    const response = await fetch(`https://genai-jp.onrender.com/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName: name, logoUrl, goal }),
    });
    const data = await response.json();
    setFormData({
      ...formData,
      [section]: data[`${section}Config`],
    });
  };

  const handleSubmit = async () => {
    // Construct the data to match the required format
    const postData = {
      darkMode: formData.theme.theme === "dark",
      color: formData.theme.color,
      uniqueID: formData.websitedetails.uniqueID,
      header: {
        headerTemplateID: formData.header.headerTemplateID,
        companyName: formData.header.companyName,
        logoUrl: formData.header.logoUrl,
        menuItems: formData.header.menuItems.map((item, index) => ({
          ...item,
          _id: `menu${index}`,
        })),
        actionButton: {
          ...formData.header.actionButton,
        },
      },
      hero: {
        heroTemplateID: formData.hero.heroTemplateID,
        topic: formData.hero.topic,
        title: formData.hero.title,
        para: formData.hero.para,
        buttons: formData.hero.buttons.map((button, index) => ({
          ...button,
          _id: `heroButton${index}`,
        })),
        imageUrl: formData.hero.imageUrl,
      },
      features: {
        featuresTemplateID: formData.features.featuresTemplateID,
        title: formData.features.title,
        description: formData.features.description,
        items: formData.features.items.map((item, index) => ({
          ...item,
          _id: `feature${index}`,
        })),
      },
      products: {
        productsTemplateID: formData.products.productsTemplateID,
        list: formData.products.list.map((product, index) => ({
          ...product,
          _id: `product${index}`,
        })),
      },
      teamMembers: {
        teamMembersTemplateID: formData.teamMembers.teamMembersTemplateID,
        Members: formData.teamMembers.Members.map((member, index) => ({
          ...member,
          _id: `teamMember${index}`,
        })),
      },
      callToAction: {
        callToActionTemplateID: formData.callToAction.callToActionTemplateID,
        heading: formData.callToAction.heading,
        subheading: formData.callToAction.subheading,
        buttonText: formData.callToAction.buttonText,
        buttonText1: formData.callToAction.buttonText1,
      },
      footer: {
        footerTemplateID: formData.footer.footerTemplateID,
        companyName: formData.footer.companyName,
        companyDescription1: formData.footer.companyDescription1,
        companyDescription2: formData.footer.companyDescription2,
        contactsTitle: formData.footer.contactsTitle,
        phoneLabel: formData.footer.phoneLabel,
        phone: formData.footer.phone,
        emailLabel: formData.footer.emailLabel,
        email: formData.footer.email,
        addressLabel: formData.footer.addressLabel,
        address: formData.footer.address,
        socialTitle: formData.footer.socialTitle,
        socialDescription: formData.footer.socialDescription,
        copyright: formData.footer.copyright,
        faq: formData.footer.faq,
        privacyPolicy: formData.footer.privacyPolicy,
        termsAndConditions: formData.footer.termsAndConditions,
        icons: {
          company: formData.footer.icons.company,
          twitter: formData.footer.icons.twitter,
          instagram: formData.footer.icons.instagram,
          facebook: formData.footer.icons.facebook,
        },
      },
    };

    try {
      const response = await fetch("http://localhost:5050/api/justprompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Form submitted successfully!");
      } else {
        console.error("Error submitting form", response.statusText);
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const sections = [
    {
      title: "Company Information",
      content: (
        <>
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.company.name}
            onChange={(e) =>
              handleInputChange("company", "name", e.target.value)
            }
          />
          <label className="block mb-2">Company Goal</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.company.goal}
            onChange={(e) =>
              handleInputChange("company", "goal", e.target.value)
            }
          />
          <label className="block mb-2">Logo URL</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.company.logoUrl}
            onChange={(e) =>
              handleInputChange("company", "logoUrl", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Theme",
      content: (
        <>
          <label className="block mb-2">Theme</label>
          <select
            className="mb-4 p-2 w-full border rounded"
            value={formData.theme.theme}
            onChange={(e) =>
              handleInputChange("theme", "theme", e.target.value)
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <label className="block mb-2">Color</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.theme.color}
            onChange={(e) =>
              handleInputChange("theme", "color", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Header",
      content: (
        <>
          {templateSelectionImages("header", [
            "template1",
            "template2",
            "template3",
          ])}
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.header.companyName}
            onChange={(e) =>
              handleInputChange("header", "companyName", e.target.value)
            }
          />
          <label className="block mb-2">Logo URL</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.header.logoUrl}
            onChange={(e) =>
              handleInputChange("header", "logoUrl", e.target.value)
            }
          />
          <label className="block mb-2">Menu Items</label>
          {formData.header.menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Label"
                className="mb-1 p-2 w-full border rounded"
                value={item.label || ""}
                onChange={(e) =>
                  handleInputChange(
                    "header",
                    "menuItems",
                    { label: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                placeholder="Link"
                className="p-2 w-full border rounded"
                value={item.link || ""}
                onChange={(e) =>
                  handleInputChange(
                    "header",
                    "menuItems",
                    { link: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => addItem("header", "menuItems")}
          >
            Add Menu Item
          </button>
          <label className="block mb-2">Action Button</label>
          <input
            type="text"
            placeholder="Label"
            className="mb-2 p-2 w-full border rounded"
            value={formData.header.actionButton.label}
            onChange={(e) =>
              handleInputChange("header", "actionButton", {
                label: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Link"
            className="p-2 w-full border rounded"
            value={formData.header.actionButton.link}
            onChange={(e) =>
              handleInputChange("header", "actionButton", {
                link: e.target.value,
              })
            }
          />
        </>
      ),
    },
    {
      title: "Hero",
      content: (
        <>
          {templateSelectionImages("hero", [
            "template1",
            "template2",
            "template3",
          ])}
          <label className="block mb-2">Topic</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.hero.topic}
            onChange={(e) => handleInputChange("hero", "topic", e.target.value)}
          />
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.hero.title}
            onChange={(e) => handleInputChange("hero", "title", e.target.value)}
          />
          <label className="block mb-2">Paragraph</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.hero.para}
            onChange={(e) => handleInputChange("hero", "para", e.target.value)}
          ></textarea>
          <label className="block mb-2">Buttons</label>
          {formData.hero.buttons.map((button, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Label"
                className="mb-1 p-2 w-full border rounded"
                value={button.label || ""}
                onChange={(e) =>
                  handleInputChange(
                    "hero",
                    "buttons",
                    { label: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                placeholder="Link"
                className="p-2 w-full border rounded"
                value={button.link || ""}
                onChange={(e) =>
                  handleInputChange(
                    "hero",
                    "buttons",
                    { link: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => addItem("hero", "buttons")}
          >
            Add Button
          </button>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            className="p-2 w-full border rounded"
            value={formData.hero.imageUrl}
            onChange={(e) =>
              handleInputChange("hero", "imageUrl", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Features",
      content: (
        <>
          {templateSelectionImages("features", [
            "template1",
            "template2",
            "template3",
          ])}
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.features.title}
            onChange={(e) =>
              handleInputChange("features", "title", e.target.value)
            }
          />
          <label className="block mb-2">Description</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.features.description}
            onChange={(e) =>
              handleInputChange("features", "description", e.target.value)
            }
          ></textarea>
          <label className="block mb-2">Items</label>
          {formData.features.items.map((item, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Title"
                className="mb-1 p-2 w-full border rounded"
                value={item.title || ""}
                onChange={(e) =>
                  handleInputChange(
                    "features",
                    "items",
                    { title: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="p-2 w-full border rounded"
                value={item.description || ""}
                onChange={(e) =>
                  handleInputChange(
                    "features",
                    "items",
                    { description: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => addItem("features", "items")}
          >
            Add Item
          </button>
        </>
      ),
    },
    {
      title: "Products",
      content: (
        <>
          {templateSelectionImages("products", [
            "template1",
            "template2",
            "template3",
          ])}
          <label className="block mb-2">Products List</label>
          {formData.products.list.map((product, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Name"
                className="mb-1 p-2 w-full border rounded"
                value={product.name || ""}
                onChange={(e) =>
                  handleInputChange(
                    "products",
                    "list",
                    { name: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="mb-1 p-2 w-full border rounded"
                value={product.description || ""}
                onChange={(e) =>
                  handleInputChange(
                    "products",
                    "list",
                    { description: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="p-2 w-full border rounded"
                value={product.imageUrl || ""}
                onChange={(e) =>
                  handleInputChange(
                    "products",
                    "list",
                    { imageUrl: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => addItem("products", "list")}
          >
            Add Product
          </button>
        </>
      ),
    },
    {
      title: "About",
      content: (
        <>
          {templateSelectionImages("about", [
            "template1",
            "template2",
            "template3",
          ])}
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.about.title}
            onChange={(e) =>
              handleInputChange("about", "title", e.target.value)
            }
          />
          <label className="block mb-2">Description</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.about.description}
            onChange={(e) =>
              handleInputChange("about", "description", e.target.value)
            }
          ></textarea>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            className="p-2 w-full border rounded"
            value={formData.about.imageUrl}
            onChange={(e) =>
              handleInputChange("about", "imageUrl", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Testimonials",
      content: (
        <>
          {templateSelectionImages("testimonials", [
            "template1",
            "template2",
            "template3",
          ])}
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.testimonials.title}
            onChange={(e) =>
              handleInputChange("testimonials", "title", e.target.value)
            }
          />
          <label className="block mb-2">Items</label>
          {formData.testimonials.items.map((item, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Name"
                className="mb-1 p-2 w-full border rounded"
                value={item.name || ""}
                onChange={(e) =>
                  handleInputChange(
                    "testimonials",
                    "items",
                    { name: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                placeholder="Review"
                className="mb-1 p-2 w-full border rounded"
                value={item.review || ""}
                onChange={(e) =>
                  handleInputChange(
                    "testimonials",
                    "items",
                    { review: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="p-2 w-full border rounded"
                value={item.imageUrl || ""}
                onChange={(e) =>
                  handleInputChange(
                    "testimonials",
                    "items",
                    { imageUrl: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => addItem("testimonials", "items")}
          >
            Add Item
          </button>
        </>
      ),
    },
    {
      title: "Contact",
      content: (
        <>
          {templateSelectionImages("contact", [
            "template1",
            "template2",
            "template3",
          ])}
          <label className="block mb-2">Address</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.contact.address}
            onChange={(e) =>
              handleInputChange("contact", "address", e.target.value)
            }
          />
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.contact.phone}
            onChange={(e) =>
              handleInputChange("contact", "phone", e.target.value)
            }
          />
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="mb-4 p-2 w-full border rounded"
            value={formData.contact.email}
            onChange={(e) =>
              handleInputChange("contact", "email", e.target.value)
            }
          />
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="border-b mb-4">
        <ul className="flex">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 ${
                currentStep === index ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {step.title}
            </li>
          ))}
        </ul>
      </div>
      <div>{steps[currentStep].content}</div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="bg-gray-500 text-white p-2 rounded"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
