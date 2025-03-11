import React from 'react';

export default function GenerateContent({ formData }) {
  return (
    <div>
      <h1>Generate Content</h1>
      <p><strong>Business Name:</strong> {formData.businessName}</p>
      <p><strong>Business Description:</strong> {formData.businessDescription}</p>
      <p><strong>Theme Color:</strong> {formData.themeColor}</p>
      <p><strong>Theme:</strong> {formData.theme}</p>
      <p><strong>Sections:</strong> {formData.sections.join(', ')}</p>
      <p><strong>Testimonials:</strong> {formData.testimonials}</p>
      <p><strong>Statistics:</strong> {formData.statistics}</p>
      <p><strong>Logo URL:</strong> {formData.logoUrl}</p>
      <p><strong>Social Media Links:</strong></p>
      <ul>
        <li>Facebook: {formData.socialMediaLinks.facebook}</li>
        <li>Twitter: {formData.socialMediaLinks.twitter}</li>
        <li>Instagram: {formData.socialMediaLinks.instagram}</li>
        <li>LinkedIn: {formData.socialMediaLinks.linkedin}</li>
        <li>Youtube: {formData.socialMediaLinks.youtube}</li>
        <li>Others: {formData.socialMediaLinks.others}</li>
      </ul>
    </div>
  );
}