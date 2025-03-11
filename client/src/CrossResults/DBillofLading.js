import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { BsFiletypePng,BsFiletypePdf } from "react-icons/bs";
import { saveAs } from 'file-saver';
import { FaSpinner } from 'react-icons/fa';


export default function BillofLading() {
  const [formData, setFormData] = useState({
    "documentTitle": "Bill of Lading",
    "shipper": {
      "name": "Shipper Name",
      "address": "123 Shipper Street",
      "cityStateZip": "Shipper City, State 12345"
    },
    "consignee": {
      "name": "Consignee Name",
      "address": "456 Consignee Avenue",
      "cityStateZip": "Consignee City, State 67890"
    },
    "notifyParty": {
      "name": "Notify Party Name",
      "address": "789 Notify Street",
      "cityStateZip": "Notify City, State 13579"
    },
    "details": {
      "blNumber": "BL123456789",
      "shipperReference": "SHIP-REF-001",
      "carrierReference": "CARR-REF-001",
      "uniqueConsignmentRef": "UCR-001",
      "carrierName": "Global Shipping Co.",
      "preCarriageBy": "Truck",
      "placeOfReceipt": "Port A",
      "additionalInformation": "",
      "vesselAircraft": "SS CARGO EXPRESS",
      "voyageNumber": "V001",
      "portOfLoading": "Port B",
      "portOfDischarge": "Port C",
      "placeOfDelivery": "Warehouse X",
      "finalDestination": "City Y"
    },
    "cargo": [
      {
        "marksAndNumbers": "ABCD1234",
        "kindAndNoOfPackages": "10 Pallets",
        "descriptionOfGoods": "Electronic Components",
        "netWeightKg": 5000,
        "grossWeightKg": 5500,
        "measurementsM3": 20
      }
    ],
    "totals": {
      "totalPackages": "10 Pallets",
      "totalGrossWeightKg": 5500,
      "totalVolumeM3": 20
    },
    "containerDetails": {
      "containerNumbers": [
        "CONT123",
        "CONT456"
      ],
      "sealNumbers": [
        "SEAL789",
        "SEAL012"
      ],
      "sizeType": "40' High Cube"
    },
    "termsAndConditions": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nisl nunc tincidunt nunc, vitae aliquam nunc nunc vitae nunc. Sed euismod, nunc id aliquam tincidunt, nisl nunc tincidunt nunc, vitae aliquam nunc nunc vitae nunc.",
    "issueDetails": {
      "placeAndDateOfIssue": "Port A, 2023-06-15",
      "signatoryCompany": "Global Shipping Co.",
      "authorizedSignatoryName": "John Doe",
      "signature": ""
    },
    "footer": "Shipped on board the vessel, in apparent good order and condition for carriage to the port of discharge or so near thereunto as she may safely get, and to be delivered in the like good order and condition as above."
  });

  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDownload = async () => {
    if (formRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(formRef.current);
      const link = document.createElement('a');
      link.download = 'bill_of_lading.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to download image.');
    }
  };

  const handlePDFDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://testing1-60034772544.development.catalystserverless.in/server/testing_1_function/generatebilloflading', formData, {
        responseType: 'blob', // Important to handle binary data
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, 'bill_of_lading.pdf');
    } catch (error) {
      console.error('Error downloading the PDF', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<div className="flex items-center justify-between border-b bg-gray-800 rounded-lg container mx-auto p-4  h-full">
    <div className="text-lg font-bold text-gray-100">Bill of Lading</div>
    <div className="ml-auto flex items-center space-x-5">
        <button className="flex items-center space-x-5 text-gray-100">
            <BsFiletypePng className="h-6 w-6" onClick={handleDownload} />
        </button>
        <button className="flex items-center space-x-5 text-gray-100" onClick={handlePDFDownload}>
            {loading ? <FaSpinner className="animate-spin h-6 w-6" /> : <BsFiletypePdf className="h-6 w-6" />}
          </button>
    </div>
</div>

      <div ref={formRef} className="border-black p-5 bg-white">
    <h1 className="text-center text-lg mb-4 uppercase">
      <input
        type="text"
        value={formData.documentTitle}
        onChange={(e) => setFormData({ ...formData, documentTitle: e.target.value })}
        className="w-full text-center"
      />
    </h1>
    <div className="grid grid-cols-2 gap-2">
      <div className="box border border-black p-2">
        <h2 className="text-xs mb-2 uppercase">Shipper</h2>
        <p>
          <input
            type="text"
            value={formData.shipper.name}
            onChange={(e) => setFormData({ ...formData, shipper: { ...formData.shipper, name: e.target.value } })}
            className="w-full"
          />
          <br />
          <input
            type="text"
            value={formData.shipper.address}
            onChange={(e) => setFormData({ ...formData, shipper: { ...formData.shipper, address: e.target.value } })}
            className="w-full"
          />
          <br />
          <input
            type="text"
            value={formData.shipper.cityStateZip}
            onChange={(e) => setFormData({ ...formData, shipper: { ...formData.shipper, cityStateZip: e.target.value } })}
            className="w-full"
          />
        </p>
      </div>
      <div className="grid gap-2">
        <div className="box border border-black p-2">
          <strong>B/L No.:</strong>
          <input
            type="text"
            value={formData.details.blNumber}
            onChange={(e) => setFormData({ ...formData, details: { ...formData.details, blNumber: e.target.value } })}
            className="w-full"
          />
        </div>
        <div className="box border border-black p-2">
          <strong>Shipper's Reference:</strong>
          <input
            type="text"
            value={formData.details.shipperReference}
            onChange={(e) => setFormData({ ...formData, details: { ...formData.details, shipperReference: e.target.value } })}
            className="w-full"
          />
        </div>
        <div className="box border border-black p-2">
          <strong>Carrier's Reference:</strong>
          <input
            type="text"
            value={formData.details.carrierReference}
            onChange={(e) => setFormData({ ...formData, details: { ...formData.details, carrierReference: e.target.value } })}
            className="w-full"
          />
        </div>
        <div className="box border border-black p-2">
          <strong>Unique Consignment Ref.:</strong>
          <input
            type="text"
            value={formData.details.uniqueConsignmentRef}
            onChange={(e) => setFormData({ ...formData, details: { ...formData.details, uniqueConsignmentRef: e.target.value } })}
            className="w-full"
          />
        </div>
        <div className="box border border-black p-2">
          <strong>Carrier Name:</strong>
          <input
            type="text"
            value={formData.details.carrierName}
            onChange={(e) => setFormData({ ...formData, details: { ...formData.details, carrierName: e.target.value } })}
            className="w-full"
          />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="box border border-black p-2">
        <h2 className="text-xs mb-2 uppercase">Consignee</h2>
        <p>
          <input
            type="text"
            value={formData.consignee.name}
            onChange={(e) => setFormData({ ...formData, consignee: { ...formData.consignee, name: e.target.value } })}
            className="w-full"
          />
          <br />
          <input
            type="text"
            value={formData.consignee.address}
            onChange={(e) => setFormData({ ...formData, consignee: { ...formData.consignee, address: e.target.value } })}
            className="w-full"
          />
          <br />
          <input
            type="text"
            value={formData.consignee.cityStateZip}
            onChange={(e) => setFormData({ ...formData, consignee: { ...formData.consignee, cityStateZip: e.target.value } })}
            className="w-full"
          />
        </p>
      </div>
      <div className="box border border-black p-2">
        <h2 className="text-xs mb-2 uppercase">Notify Party (If not Consignee)</h2>
        <p>
          <input
            type="text"
            value={formData.notifyParty.name}
            onChange={(e) => setFormData({ ...formData, notifyParty: { ...formData.notifyParty, name: e.target.value } })}
            className="w-full"
          />
          <br />
          <input
            type="text"
            value={formData.notifyParty.address}
            onChange={(e) => setFormData({ ...formData, notifyParty: { ...formData.notifyParty, address: e.target.value } })}
            className="w-full"
          />
          <br />
          <input
            type="text"
            value={formData.notifyParty.cityStateZip}
            onChange={(e) => setFormData({ ...formData, notifyParty: { ...formData.notifyParty, cityStateZip: e.target.value } })}
            className="w-full"
          />
        </p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mt-2">
      <div className="box border border-black p-2">
        <strong>Pre-Carriage By:</strong>
        <input
          type="text"
          value={formData.details.preCarriageBy}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, preCarriageBy: e.target.value } })}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Place of Receipt:</strong>
        <input
          type="text"
          value={formData.details.placeOfReceipt}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, placeOfReceipt: e.target.value } })}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Additional Information:</strong>
        <input
          type="text"
          value={formData.details.additionalInformation}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, additionalInformation: e.target.value } })}
          className="w-full"
        />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mt-2">
      <div className="box border border-black p-2">
        <strong>Vessel / Aircraft:</strong>
        <input
          type="text"
          value={formData.details.vesselAircraft}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, vesselAircraft: e.target.value } })}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Voyage No.:</strong>
        <input
          type="text"
          value={formData.details.voyageNumber}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, voyageNumber: e.target.value } })}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Port of Loading:</strong>
        <input
          type="text"
          value={formData.details.portOfLoading}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, portOfLoading: e.target.value } })}
          className="w-full"
        />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mt-2">
      <div className="box border border-black p-2">
        <strong>Port of Discharge:</strong>
        <input
          type="text"
          value={formData.details.portOfDischarge}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, portOfDischarge: e.target.value } })}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Place of Delivery:</strong>
        <input
          type="text"
          value={formData.details.placeOfDelivery}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, placeOfDelivery: e.target.value } })}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Final Destination:</strong>
        <input
          type="text"
          value={formData.details.finalDestination}
          onChange={(e) => setFormData({ ...formData, details: { ...formData.details, finalDestination: e.target.value } })}
          className="w-full"
        />
      </div>
    </div>
    <table className="w-full border-collapse mt-3">
      <thead>
        <tr>
          <th className="border border-black p-2 bg-gray-200 font-bold uppercase">Marks &amp; Numbers</th>
          <th className="border border-black p-2 bg-gray-200 font-bold uppercase">Kind &amp; No of Packages</th>
          <th className="border border-black p-2 bg-gray-200 font-bold uppercase">Description of Goods</th>
          <th className="border border-black p-2 bg-gray-200 font-bold uppercase">Net Weight (Kg)</th>
          <th className="border border-black p-2 bg-gray-200 font-bold uppercase">Gross Weight (Kg)</th>
          <th className="border border-black p-2 bg-gray-200 font-bold uppercase">Measurements (m³)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-black p-2">
            <input
              type="text"
              value={formData.cargo[0].marksAndNumbers}
              onChange={(e) => {
                const updatedCargo = [...formData.cargo];
                updatedCargo[0].marksAndNumbers = e.target.value;
                setFormData({ ...formData, cargo: updatedCargo });
              }}
              className="w-full"
            />
          </td>
          <td className="border border-black p-2">
            <input
              type="text"
              value={formData.cargo[0].kindAndNoOfPackages}
              onChange={(e) => {
                const updatedCargo = [...formData.cargo];
                updatedCargo[0].kindAndNoOfPackages = e.target.value;
                setFormData({ ...formData, cargo: updatedCargo });
              }}
              className="w-full"
            />
          </td>
          <td className="border border-black p-2">
            <input
              type="text"
              value={formData.cargo[0].descriptionOfGoods}
              onChange={(e) => {
                const updatedCargo = [...formData.cargo];
                updatedCargo[0].descriptionOfGoods = e.target.value;
                setFormData({ ...formData, cargo: updatedCargo });
              }}
              className="w-full"
            />
          </td>
          <td className="border border-black p-2">
            <input
              type="text"
              value={formData.cargo[0].netWeightKg}
              onChange={(e) => {
                const updatedCargo = [...formData.cargo];
                updatedCargo[0].netWeightKg = e.target.value;
                setFormData({ ...formData, cargo: updatedCargo });
              }}
              className="w-full"
            />
          </td>
          <td className="border border-black p-2">
            <input
              type="text"
              value={formData.cargo[0].grossWeightKg}
              onChange={(e) => {
                const updatedCargo = [...formData.cargo];
                updatedCargo[0].grossWeightKg = e.target.value;
                setFormData({ ...formData, cargo: updatedCargo });
              }}
              className="w-full"
            />
          </td>
          <td className="border border-black p-2">
            <input
              type="text"
              value={formData.cargo[0].measurementsM3}
              onChange={(e) => {
                const updatedCargo = [...formData.cargo];
                updatedCargo[0].measurementsM3 = e.target.value;
                setFormData({ ...formData, cargo: updatedCargo });
              }}
              className="w-full"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={6} className="border border-black p-2 font-bold">
            Total This Page: {formData.totals.totalPackages}, {formData.totals.totalGrossWeightKg} Kg, {formData.totals.totalVolumeM3} m³
          </td>
        </tr>
      </tbody>
    </table>
    <div className="grid grid-cols-3 gap-2">
      <div className="box border border-black p-2">
        <strong>Container No(s):</strong>
        <input
          type="text"
          value={formData.containerDetails.containerNumbers.join(', ')}
          onChange={(e) => {
            const updatedContainerDetails = { ...formData.containerDetails, containerNumbers: e.target.value.split(', ') };
            setFormData({ ...formData, containerDetails: updatedContainerDetails });
          }}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Seal No(s):</strong>
        <input
          type="text"
          value={formData.containerDetails.sealNumbers.join(', ')}
          onChange={(e) => {
            const updatedContainerDetails = { ...formData.containerDetails, sealNumbers: e.target.value.split(', ') };
            setFormData({ ...formData, containerDetails: updatedContainerDetails });
          }}
          className="w-full"
        />
      </div>
      <div className="box border border-black p-2">
        <strong>Size / Type:</strong>
        <input
          type="text"
          value={formData.containerDetails.sizeType}
          onChange={(e) => setFormData({ ...formData, containerDetails: { ...formData.containerDetails, sizeType: e.target.value } })}
          className="w-full"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="box border border-black p-2">
        <h2 className="text-xs mb-2 uppercase">Terms and Conditions</h2>
        <textarea
          value={formData.termsAndConditions}
          onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
          className="w-full text-xs"
        />
      </div>
      <div className="box border border-black p-2">
        <p>
          <strong>Place and Date of Issue:</strong>
          <input
            type="text"
            value={formData.issueDetails.placeAndDateOfIssue}
            onChange={(e) => setFormData({ ...formData, issueDetails: { ...formData.issueDetails, placeAndDateOfIssue: e.target.value } })}
            className="w-full"
          />
        </p>
        <p>
          <strong>Signatory Company:</strong>
          <input
            type="text"
            value={formData.issueDetails.signatoryCompany}
            onChange={(e) => setFormData({ ...formData, issueDetails: { ...formData.issueDetails, signatoryCompany: e.target.value } })}
            className="w-full"
          />
        </p>
        <p>
          <strong>Name of Authorized Signatory:</strong>
          <input
            type="text"
            value={formData.issueDetails.authorizedSignatoryName}
            onChange={(e) => setFormData({ ...formData, issueDetails: { ...formData.issueDetails, authorizedSignatoryName: e.target.value } })}
            className="w-full"
          />
        </p>
        <p>
          <strong>Signature:</strong> ____________________
        </p>
      </div>
    </div>
    <div className="footer text-xs text-center mt-3">
      <p>
        <input
          type="text"
          value={formData.footer}
          onChange={(e) => setFormData({ ...formData, footer: e.target.value })}
          className="w-full text-center"
        />
      </p>
    </div>
  </div>  
    </>
  );
}