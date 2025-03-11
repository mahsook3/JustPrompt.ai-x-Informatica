import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

const Invoice = () => {
    const [data, setData] = useState({
        "shipper": {
          "name": "Suresh Sharma, Neeraj Gupta (Shahi)",
          "company": "H&M Hennes & Mauritz India (P) Ltd.",
          "address": "211, Okhla Industrial Area - Phase 3 New Delhi - India",
          "contact": "+91 11 2345 6789",
          "email": "shipping@hm-india.com"
        },
        "invoice": {
          "number": "INV-2021-04567",
          "date": "20-Apr-2021"
        },
        "origin": {
          "country": "India"
        },
        "destination": {
          "country": "China"
        },
        "consignee": {
          "name": "Icey LU",
          "seat": "NO-N13F-129",
          "company": "H&M Plus Trading Far East Shanghai",
          "address": {
            "line1": "Office Section 15, 16F, HKRi Centre TWO HKRI",
            "line2": "Taikoo HUI, 288 Shimen 1 Road, 200041, SHANGHAI CHINA",
            "city": "SHANGHAI",
            "country": "CHINA"
          },
          "department": "1510",
          "contact": "+86 21 1234 5678"
        },
        "terms": {
          "delivery": "Free Trade Samples, No Commerical Value",
          "payment": "Not for Sale"
        },
        "courier": {
          "accountNumber": "CN789456123"
        },
        "supplyChain": {
          "type": "SUPPLY CHAIN",
          "category": "WOVEN"
        },
        "items": [
          {
            "sno": "1",
            "itemNumber": "WS21-001",
            "description": "Cindy Cropped Shirt-White",
            "material": "100% Cotton",
            "quantity": 1,
            "unitPrice": "0.50",
            "totalPrice": "0.50"
          },
          {
            "sno": "2",
            "itemNumber": "WS21-002",
            "description": "Billie Loose Fit Shirt - Blue",
            "material": "100% Cotton",
            "quantity": 1,
            "unitPrice": "0.50",
            "totalPrice": "0.50"
          },
          {
            "sno": "3",
            "itemNumber": "WS21-003",
            "description": "Emma Classic Shirt - Black",
            "material": "100% Cotton",
            "quantity": 2,
            "unitPrice": "0.50",
            "totalPrice": "1.00"
          },
          {
            "sno": "4",
            "itemNumber": "WS21-004",
            "description": "Sofia Blouse - Floral Print",
            "material": "100% Cotton",
            "quantity": 1,
            "unitPrice": "0.50",
            "totalPrice": "0.50"
          },
          {
            "sno": "5",
            "itemNumber": "WS21-005",
            "description": "Luna Shirt Dress - Navy",
            "material": "100% Cotton",
            "quantity": 1,
            "unitPrice": "0.50",
            "totalPrice": "0.50"
          }
        ],
        "total": {
          "quantity": 6,
          "price": "3.00",
          "inWords": "Three Dollars Only",
          "pieces": 6,
          "cartons": 2
        },
        "company": {
          "name": "H&M Hennes & Mauritz India (P) Ltd."
        },
        "declaration": {
          "title": "Free Trade Samples, No Commercial Value. Not for Sale",
          "text": "We declare that invoice shows the actual Price of goods Described and that all particulares are true and correct."
        },
        "shippingNotes": [
          "1. Handle with care",
          "2. Keep in dry place",
          "3. This is a sample shipment",
          "4. No commercial value"
        ],
        "signature": {
          "title": "AUTHORISED SIGNATORY"
        }
    });

    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
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
            link.download = 'invoice.png';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to download image.');
        }
    };

    return (
        <>
            <div ref={formRef} className="w-[210mm] h-[297mm] p-0 bg-white">
                <div className="border border-black w-[190mm] h-[277mm] m-[10mm] box-border">
                    {/* Header */}
                    <div className="text-center border-b border-black p-2 font-bold bg-white">
                        INVOICE CUM PACKING LIST
                    </div>

                    {/* Shipper and Invoice Details */}
                    <div className="grid grid-cols-3 border-b border-black">
                        <div className="col-span-2 p-2 border-r border-black">
                            <strong>Shipper</strong><br />
                            <span contentEditable>{data.shipper.name}</span><br />
                            <span contentEditable>{data.shipper.company}</span><br />
                            <span contentEditable>{data.shipper.address}</span><br />
                            Contact: <span contentEditable>{data.shipper.contact}</span><br />
                            Email: <span contentEditable>{data.shipper.email}</span>
                        </div>
                        <div className="p-2">
                            <strong>Inv.No.& Date</strong><br />
                            <span contentEditable>{data.invoice.number}</span><br />
                            <span contentEditable>{data.invoice.date}</span><br /><br />
                            <strong>Country of Origin of Goods:</strong> <span contentEditable>{data.origin.country}</span><br />
                            <strong>Country of Final Destination:</strong> <span contentEditable>{data.destination.country}</span>
                        </div>
                    </div>

                    {/* Consignee and Terms */}
                    <div className="grid grid-cols-2 border-b border-black">
                        <div className="p-2 border-r border-black">
                            <strong>Consignee</strong><br />
                            Attn: <span contentEditable>{data.consignee.name}</span> (<span contentEditable>{data.consignee.seat}</span>)<br />
                            <span contentEditable>{data.consignee.company}</span><br />
                            <span contentEditable>{data.consignee.address.line1}</span><br />
                            <span contentEditable>{data.consignee.address.line2}</span><br />
                            <span contentEditable>{data.consignee.address.city}</span>, <span contentEditable>{data.consignee.address.country}</span><br />
                            Deptt - <span contentEditable>{data.consignee.department}</span><br />
                            Contact: <span contentEditable>{data.consignee.contact}</span>
                        </div>
                        <div className="p-2">
                            <strong>Terms of Delivery & Payment:</strong><br />
                            <span contentEditable>{data.terms.delivery}</span><br />
                            <span contentEditable>{data.terms.payment}</span><br />
                            <strong>Courier Account Number:</strong> <span contentEditable>{data.courier.accountNumber}</span>

                            <div className="text-center font-bold mt-2">
                                <span contentEditable>{data.supplyChain.type}</span><br />
                                <span contentEditable>{data.supplyChain.category}</span>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full border-collapse border border-black text-sm">
                        <thead>
                            <tr>
                                <th className="border border-black p-1">S.no</th>
                                <th className="border border-black p-1">Item #</th>
                                <th className="border border-black p-1">Description</th>
                                <th className="border border-black p-1">Material</th>
                                <th className="border border-black p-1">Quantity</th>
                                <th className="border border-black p-1 text-right">USD FOB</th>
                                <th className="border border-black p-1 text-right">USD Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-black p-1"><span contentEditable>{item.sno}</span></td>
                                    <td className="border border-black p-1"><span contentEditable>{item.itemNumber}</span></td>
                                    <td className="border border-black p-1"><span contentEditable>{item.description}</span></td>
                                    <td className="border border-black p-1"><span contentEditable>{item.material}</span></td>
                                    <td className="border border-black p-1"><span contentEditable>{item.quantity}</span></td>
                                    <td className="border border-black p-1 text-right"><span contentEditable>{item.unitPrice}</span></td>
                                    <td className="border border-black p-1 text-right">$ <span contentEditable>{item.totalPrice}</span></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="border border-black p-1 text-center font-bold">TOTAL</td>
                                <td className="border border-black p-1"><span contentEditable>{data.total.quantity}</span></td>
                                <td className="border border-black p-1"></td>
                                <td className="border border-black p-1 text-right">$ <span contentEditable>{data.total.price}</span></td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Totals and Declaration */}
                    <div className="border-t border-black p-2">
                        <strong>Amount in Words: <span contentEditable>{data.total.inWords}</span></strong>
                        <table className="mt-2">
                            <tbody>
                                <tr>
                                    <td className="pr-4">Total Pcs/Sets:</td>
                                    <td><span contentEditable>{data.total.pieces}</span></td>
                                    <td rowSpan="2" className="font-bold">For <span contentEditable>{data.company.name}</span></td>
                                </tr>
                                <tr>
                                    <td>Total # of Cartons:</td>
                                    <td><span contentEditable>{data.total.cartons}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-black p-2">
                        <strong><span contentEditable>{data.declaration.title}</span></strong><br />
                        <strong>Declaration:</strong><br />
                        <span contentEditable>{data.declaration.text}</span><br /><br />
                        <strong>Shipping Notes:</strong><br />
                        {data.shippingNotes.map((note, index) => (
                            <div key={index}><span contentEditable>{note}</span></div>
                        ))}
                    </div>

                    <div className="text-right p-2 font-bold">
                        <span contentEditable>{data.signature.title}</span>
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

export default Invoice;