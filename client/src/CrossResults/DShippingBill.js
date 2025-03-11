import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

const DShippingBill = () => {
    const data = (
        {
            "billDetails": {
              "number": "PBE/2023/001",
              "date": "23-12-2023"
            },
            "postOffice": {
              "code": "DEL-FPO-001"
            },
            "exporter": {
              "name": "Sample Exports Ltd.",
              "address": "123 Export Zone, New Delhi - 110001",
              "iec": "IEC123456789",
              "stateCode": "07",
              "gstin": "07ABCDE1234F1Z5",
              "adCode": "AD001234"
            },
            "broker": {
              "licenseNo": "CHA/DEL/123/2023",
              "nameAddress": "Custom House Agent, Delhi"
            },
            "applicable": "Yes",
            "parcelDetails": {
              "consignee": {
                "nameAddress": "Import Company Ltd., 123 Import Street",
                "country": "United States"
              },
              "product": {
                "description": "Handcrafted Textile Products",
                "cth": "5208",
                "unit": "PCS",
                "quantity": "100",
                "number": "12345"
              },
              "invoice": {
                "number": "INV/2023/001",
                "date": "23-12-2023"
              },
              "weight": {
                "gross": "25.5",
                "net": "24.2"
              },
              "ecommerce": {
                "website": "www.marketplace.com",
                "transactionId": "TXN123456789",
                "skuNo": "SKU001"
              },
              "postalTracking": "RP123456789IN"
            },
            "assessableValue": {
              "fob": "5000.00",
              "currencyRate": "82.50",
              "amountInr": "412500.00",
              "schemeCode": "01"
            },
            "taxInvoice": {
              "number": "TAX/2023/001",
              "date": "23-12-2023",
              "itemNo": "1",
              "rate": "18",
              "amount": "74250.00"
            },
            "dutyDetails": {
              "exportDuty": {
                "rate": "0",
                "amount": "0"
              },
              "cess": {
                "rate": "0",
                "amount": "0"
              },
              "igst": {
                "rate": "0",
                "amount": "0"
              },
              "compensationCess": {
                "rate": "0",
                "amount": "0"
              },
              "iottBond": "NA"
            },
            "total": {
              "duties": "0",
              "cess": "0"
            }
          }
    )

    const formRef = useRef(null);

    const handleDownload = async () => {
        if (formRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(formRef.current);
            const link = document.createElement('a');
            link.download = 'shipping_bill.png';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to download image.');
        }
    };

    return (
        <>
            <div ref={formRef} className="w-[297mm] h-[210mm] mx-auto p-4 bg-white">
                <div className="border border-black bg-white p-4 box-border">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <div className="font-bold text-lg">FORM-1</div>
                        <div className="italic text-sm">(see regulation 4)</div>
                        <div className="font-bold text-lg">Postal Bill of Export - 1 (PBE - 1)</div>
                        <div className="italic text-sm">(For export of goods through E-Commerce)</div>
                        <div className="italic text-sm">(To be submitted in duplicate)</div>
                    </div>

                    {/* Header Table */}
                    <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
                        <div>
                            <div>Bill of Export No. and date</div>
                            <div contentEditable>{data.billDetails.number}</div>
                            <div contentEditable>{data.billDetails.date}</div>
                        </div>
                        <div>
                            <div>Foreign Post office code</div>
                            <div contentEditable>{data.postOffice.code}</div>
                        </div>
                        <div>
                            <div>Name of Exporter</div>
                            <div contentEditable>{data.exporter.name}</div>
                        </div>
                        <div>
                            <div>Address of Exporter</div>
                            <div contentEditable>{data.exporter.address}</div>
                        </div>
                        <div>
                            <div>IEC</div>
                            <div contentEditable>{data.exporter.iec}</div>
                        </div>
                        <div>
                            <div>State code</div>
                            <div contentEditable>{data.exporter.stateCode}</div>
                        </div>
                        <div>
                            <div>GSTIN or as applicable</div>
                            <div contentEditable>{data.exporter.gstin}</div>
                        </div>
                        <div>
                            <div>AD code (if applicable)</div>
                            <div contentEditable>{data.exporter.adCode}</div>
                        </div>
                        <div>
                            <div>Details of Customs Broker</div>
                            <div>License No: <span contentEditable>{data.broker.licenseNo}</span></div>
                            <div contentEditable>{data.broker.nameAddress}</div>
                        </div>
                        <div>
                            <div>Yes/No as applicable</div>
                            <div contentEditable>{data.applicable}</div>
                        </div>
                    </div>

                    {/* Declarations */}
                    <div className="mb-4">
                        <div className="text-center font-bold">Declarations</div>
                        <ol className="list-decimal ml-6 text-sm">
                            <li contentEditable>We declare that we intend to claim rewards under Merchandise Exports from India Scheme (MEIS) (for export through Chennai / Mumbai / Delhi FPO only).</li>
                            <li contentEditable>We declare that we intend to zero rate our exports under Section 16 of IGST Act.</li>
                            <li contentEditable>We declare that the goods are exempted under CGST/SGST/UTGST/IGST Acts.</li>
                        </ol>
                    </div>

                    {/* Signature Section */}
                    <div className="border border-black p-4 mb-4 text-sm">
                        We hereby declare that the contents of this postal bill of export are true and correct in every respect.
                        <br /><br />
                        (Signature of the Exporter/ Authorised agent)
                    </div>

                    {/* Examination Section */}
                    <div className="mb-4 text-sm">
                        <strong>Examination order and report</strong><br />
                        Let Export Order: Signature of officer of Customs along with stamp and date
                    </div>

                    {/* Parcel Details Table */}
                    <div>
                        <div className="text-center font-bold mb-2">Details of parcel</div>
                        <table className="w-full border border-black text-sm">
                            <thead>
                                <tr>
                                    <th className="border border-black p-2">Sl. No</th>
                                    <th className="border border-black p-2">Consignee details</th>
                                    <th className="border border-black p-2">Country of destination</th>
                                    <th className="border border-black p-2">Product details</th>
                                    <th className="border border-black p-2">Invoice no. and date</th>
                                    <th className="border border-black p-2">Weight Gross/Net</th>
                                    <th className="border border-black p-2">URL /Name of website</th>
                                    <th className="border border-black p-2">Payment transaction ID</th>
                                    <th className="border border-black p-2">Postal tracking</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-2 text-center" contentEditable>{data.parcelDetails.product.number}</td>
                                    <td className="border border-black p-2" contentEditable>{data.parcelDetails.consignee.nameAddress}</td>
                                    <td className="border border-black p-2 text-center" contentEditable>{data.parcelDetails.consignee.country}</td>
                                    <td className="border border-black p-2" contentEditable>{data.parcelDetails.product.description}</td>
                                    <td className="border border-black p-2" contentEditable>{data.parcelDetails.invoice.number} / {data.parcelDetails.invoice.date}</td>
                                    <td className="border border-black p-2 text-center" contentEditable>{data.parcelDetails.weight.gross} / {data.parcelDetails.weight.net}</td>
                                    <td className="border border-black p-2" contentEditable>{data.parcelDetails.ecommerce.website}</td>
                                    <td className="border border-black p-2" contentEditable>{data.parcelDetails.ecommerce.transactionId}</td>
                                    <td className="border border-black p-2 text-center" contentEditable>{data.parcelDetails.postalTracking}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Download
                </button>
            </div>
        </>
    );
};

export default DShippingBill;