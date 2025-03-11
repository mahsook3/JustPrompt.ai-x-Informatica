import pdf from 'pdf-creator-node';

const htmlTemplate = (jsonData) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bill of Lading</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            border: 1px solid #000;
            padding: 20px;
        }
        h1 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .grid {
            display: grid;
            gap: 10px;
        }
        .grid-2 {
            grid-template-columns: 1fr 1fr;
        }
        .grid-3 {
            grid-template-columns: 1fr 1fr 1fr;
        }
        .box {
            border: 1px solid #000;
            padding: 5px;
        }
        .box h2 {
            font-size: 12px;
            margin: 0 0 5px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }
        th, td {
            border: 1px solid #000;
            padding: 5px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0;
        }
        .footer {
            font-size: 8px;
            text-align: center;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${jsonData.documentTitle}</h1>
        
        <div class="grid grid-2">
            <div class="box">
                <h2>Shipper</h2>
                <p>${jsonData.shipper.name}<br>
                ${jsonData.shipper.address}<br>
                ${jsonData.shipper.cityStateZip}</p>
            </div>
            <div class="grid">
                <div class="grid grid-2">
                    <div class="box">
                        <strong>B/L No.:</strong> ${jsonData.details.blNumber}
                    </div>
                </div>
                <div class="box">
                    <strong>Shipper's Reference:</strong> ${jsonData.details.shipperReference}
                </div>
                <div class="box">
                    <strong>Carrier's Reference:</strong> ${jsonData.details.carrierReference}
                </div>
                <div class="box">
                    <strong>Unique Consignment Ref.:</strong> ${jsonData.details.uniqueConsignmentRef}
                </div>
                <div class="box">
                    <strong>Carrier Name:</strong> ${jsonData.details.carrierName}
                </div>
            </div>
        </div>

        <div class="grid grid-2" style="margin-top: 10px;">
            <div class="box">
                <h2>Consignee</h2>
                <p>${jsonData.consignee.name}<br>
                ${jsonData.consignee.address}<br>
                ${jsonData.consignee.cityStateZip}</p>
            </div>
            <div class="box">
                <h2>Notify Party (If not Consignee)</h2>
                <p>${jsonData.notifyParty.name}<br>
                ${jsonData.notifyParty.address}<br>
                ${jsonData.notifyParty.cityStateZip}</p>
            </div>
        </div>

        <div class="grid grid-3" style="margin-top: 10px;">
            <div class="box">
                <strong>Pre-Carriage By:</strong> ${jsonData.details.preCarriageBy}
            </div>
            <div class="box">
                <strong>Place of Receipt:</strong> ${jsonData.details.placeOfReceipt}
            </div>
            <div class="box">
                <strong>Additional Information:</strong> ${jsonData.details.additionalInformation}
            </div>
        </div>

        <div class="grid grid-3" style="margin-top: 10px;">
            <div class="box">
                <strong>Vessel / Aircraft:</strong> ${jsonData.details.vesselAircraft}
            </div>
            <div class="box">
                <strong>Voyage No.:</strong> ${jsonData.details.voyageNumber}
            </div>
            <div class="box">
                <strong>Port of Loading:</strong> ${jsonData.details.portOfLoading}
            </div>
        </div>

        <div class="grid grid-3" style="margin-top: 10px;">
            <div class="box">
                <strong>Port of Discharge:</strong> ${jsonData.details.portOfDischarge}
            </div>
            <div class="box">
                <strong>Place of Delivery:</strong> ${jsonData.details.placeOfDelivery}
            </div>
            <div class="box">
                <strong>Final Destination:</strong> ${jsonData.details.finalDestination}
            </div>
        </div>

        <table style="margin-top: 10px;">
            <thead>
                <tr>
                    <th>Marks & Numbers</th>
                    <th>Kind & No of Packages</th>
                    <th>Description of Goods</th>
                    <th>Net Weight (Kg)</th>
                    <th>Gross Weight (Kg)</th>
                    <th>Measurements (m³)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${jsonData.cargo[0].marksAndNumbers}</td>
                    <td>${jsonData.cargo[0].kindAndNoOfPackages}</td>
                    <td>${jsonData.cargo[0].descriptionOfGoods}</td>
                    <td>${jsonData.cargo[0].netWeightKg}</td>
                    <td>${jsonData.cargo[0].grossWeightKg}</td>
                    <td>${jsonData.cargo[0].measurementsM3}</td>
                </tr>
                <tr>
                    <td colspan="6">
                        <strong>Total This Page:</strong> ${jsonData.totals.totalPackages}, ${jsonData.totals.totalGrossWeightKg} Kg, ${jsonData.totals.totalVolumeM3} m³
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="grid grid-3">
            <div class="box">
                <strong>Container No(s):</strong> ${jsonData.containerDetails.containerNumbers}
            </div>
            <div class="box">
                <strong>Seal No(s):</strong> ${jsonData.containerDetails.sealNumbers}
            </div>
            <div class="box">
                <strong>Size / Type:</strong> ${jsonData.containerDetails.sizeType}
            </div>
        </div>

        <div class="grid grid-2" style="margin-top: 10px;">
            <div class="box">
                <h2>Terms and Conditions</h2>
                <p style="font-size: 8px;">
                    ${jsonData.termsAndConditions}
                </p>
            </div>
            <div class="box">
                <p><strong>Place and Date of Issue:</strong> ${jsonData.issueDetails.placeAndDateOfIssue}</p>
                <p><strong>Signatory Company:</strong> ${jsonData.issueDetails.signatoryCompany}</p>
                <p><strong>Name of Authorized Signatory:</strong> ${jsonData.issueDetails.authorizedSignatoryName}</p>
                <p><strong>Signature:</strong> ____________________</p>
            </div>
        </div>

        <div class="footer">
            <p>${jsonData.footer}</p>
        </div>
    </div>
</body>
</html>`;

export async function generatePDF(jsonData) {
    const html = htmlTemplate(jsonData);

    const document = {
        html: html,
        data: jsonData,
        type: 'buffer',
    };

    try {
        const buffer = await pdf.create(document);
        const base64 = buffer.toString('base64');
        return base64;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating PDF');
    }
}