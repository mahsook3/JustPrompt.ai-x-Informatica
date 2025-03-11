import express from 'express';
import catalyst from 'zcatalyst-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;

app.use(express.json());

app.post('/generate-billoflading', (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  console.log("Initializing Catalyst app...");
  try {
    const catalystApp = catalyst.initialize({
      project_id: process.env.CATALYST_PROJECT_ID,
      project_key: process.env.CATALYST_PROJECT_KEY,
      project_secret: process.env.CATALYST_PROJECT_SECRET
    });
    const smartbrowz = catalystApp.smartbrowz();

    const YOUR_TEMPLATE_DATA = {
      "documentTitle": "Bill of Lading",
      "shipper": {
        "name": "Tamil Nadu Exporter Pvt. Ltd.",
        "address": "No. 10, Marina Road",
        "cityStateZip": "Chennai, Tamil Nadu 600001"
      },
      "consignee": {
        "name": "ABC Importers Inc.",
        "address": "500 Business Ave",
        "cityStateZip": "Los Angeles, CA 90001"
      },
      "notifyParty": {
        "name": "DEF Logistics",
        "address": "123 Logistics Blvd",
        "cityStateZip": "Houston, TX 77001"
      },
      "details": {
        "blNumber": "BL987654321",
        "shipperReference": "SHIP-TN-USA-001",
        "carrierReference": "CARR-USA-001",
        "uniqueConsignmentRef": "UCR-TN-USA-001",
        "carrierName": "Tamil Nadu Shipping Co.",
        "preCarriageBy": "Truck",
        "placeOfReceipt": "Chennai Port",
        "additionalInformation": "",
        "vesselAircraft": "MV Tamil Nadu Trader",
        "voyageNumber": "TN001",
        "portOfLoading": "Chennai Port",
        "portOfDischarge": "Los Angeles Port",
        "placeOfDelivery": "Houston Warehouse",
        "finalDestination": "Houston, TX"
      },
      "cargo": [
        {
          "marksAndNumbers": "TN123456",
          "kindAndNoOfPackages": "15 Wooden Crates",
          "descriptionOfGoods": "Handcrafted Textiles",
          "netWeightKg": 3000,
          "grossWeightKg": 3200,
          "measurementsM3": 18
        }
      ],
      "totals": {
        "totalPackages": "15 Wooden Crates",
        "totalGrossWeightKg": 3200,
        "totalVolumeM3": 18
      },
      "containerDetails": {
        "containerNumbers": ["TNCONT001", "TNCONT002"],
        "sealNumbers": ["TNSEAL001", "TNSEAL002"],
        "sizeType": "20' Standard"
      },
      "termsAndConditions": "Goods shipped in compliance with all applicable export and import regulations. Risk and liability terms as per INCOTERMS 2023.",
      "issueDetails": {
        "placeAndDateOfIssue": "Chennai, 2024-11-26",
        "signatoryCompany": "Tamil Nadu Shipping Co.",
        "authorizedSignatoryName": "A. Kumar",
        "signature": ""
      },
      "footer": "Shipped on board the vessel, in apparent good order and condition for carriage to the port of discharge or so near thereunto as she may safely get, and to be delivered in the like good order and condition as above."
    }
    
    console.log("Generating document from template...");
    smartbrowz.generateFromTemplate("734000000003023", {"template_data": YOUR_TEMPLATE_DATA})
      .then((data) => {
        // On Success
        console.log("Document generated successfully:", data); // Print response here
        res.status(200).send(data);
      })
      .catch((err) => {
        // On Error
        console.log("Error generating document:", err); // Print error here
        res.status(500).send(err);
      });
  } catch (err) {
    console.log("Error initializing Catalyst app:", err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});