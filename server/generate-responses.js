import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY1,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const sampleJSON = `{
  "Mandatory Requirements": [
    {
      "Requirement": "Requirement 1",
      "Description": "Description 1"
    },
    {
      "Requirement": "Requirement 2",
      "Description": "Description 2"
    },
    {
      "Requirement": "Requirement 3",
      "Description": "Description 3"
    },
    {
      "Requirement": "Requirement 4",
      "Description": "Description 4"
    },
    {
      "Requirement": "Requirement 5",
      "Description": "Description 5"
    }
  ],
  "Recommended Requirements": [
    {
      "Requirement": "Requirement 6",
      "Description": "Description 6"
    },
    {
      "Requirement": "Requirement 7",
      "Description": "Description 7"
    },
    {
      "Requirement": "Requirement 8",
      "Description": "Description 8"
    }
  ],
  "Reference URLs": [
    "URL 1",
    "URL 2",
    "URL 3"
  ]
}`;

const BillOfLading = `{
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
    "containerNumbers": ["CONT123", "CONT456"],
    "sealNumbers": ["SEAL789", "SEAL012"],
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
}
`;

const prompt = `You are Smart International Business Advisors. Provide only the mandatory, recommended compliance requirements and Reference in JSON format, following this structure exactly. Do not include any explanatory text or additional information outside of JSON. Format: ${sampleJSON}. Here is the data:`;

export async function generateResponse(query, documents) {
  console.log("Generating response for query:", query, "with documents:", documents);

  const completion = await openai.chat.completions.create({
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    messages: [{
      "role": "user",
      "content": `${prompt} Please provide responses related to my product ${query}. Use the following data for context: ${sampleJSON} ${documents} Note: Provide the response based only on the context provided.`
  }],
    temperature: 0.5,
    top_p: 1,
    max_tokens: 1024,
    stream: true,
  });

  let response = '';
  for await (const chunk of completion) {
    response += chunk.choices[0]?.delta?.content || '';
  }

  console.log("Generated text:", response);

  // Use regex to extract only the JSON object from the response
  const jsonMatch = response.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/);

  let details;
  if (jsonMatch) {
    try {
      details = JSON.parse(jsonMatch[0]); // Parse the extracted JSON
      return details;  // Return as JSON object instead of string
    } catch (error) {
      console.error("Error parsing JSON:", error, "Extracted JSON text:", jsonMatch[0]);
      return { error: 'Failed to parse response as JSON' };
    }
  } else {
    console.error("No JSON found in response:", response);
    return { error: 'No JSON found in response' };
  }
}


export async function generateSummary(prompt) {

  const completion = await openai.chat.completions.create({
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    messages: [{
      "role": "user",
      "content": `${prompt} Provide the answer in a single line JSON format without any special characters or newlines. The result should be in JSON like below and don't include any extra fields other than anwser. also answer based only on the context provided. If data is insufficient, respond with "based on trained data, I have this information; we are working on bringing more data". but dont say like "Based on the provided context or reference" also dont make table or any other formats just give only single paragraph.
      {
       "anwser": "text here"
      }`
  }],
    temperature: 0.5,
    top_p: 1,
    max_tokens: 1024,
    stream: true,
  });

  let response = '';
  for await (const chunk of completion) {
    response += chunk.choices[0]?.delta?.content || '';
  }

  console.log("Generated text:", response);

  // Sanitize the response to remove special characters and newlines
  const sanitizedResponse = response.replace(/[\n\r]/g, '').replace(/\\n/g, '');

  // Use regex to extract only the JSON object from the sanitized response
  const jsonMatch = sanitizedResponse.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/);

  let details;
  if (jsonMatch) {
    try {
      details = JSON.parse(jsonMatch[0]); // Parse the extracted JSON
      return details;  // Return as JSON object instead of string
    } catch (error) {
      console.error("Error parsing JSON:", error, "Extracted JSON text:", jsonMatch[0]);
      return { error: 'Failed to parse response as JSON' };
    }
  } else {
    console.error("No JSON found in response:", response);
    return { error: 'No JSON found in response' };
  }
}


export async function generateContent(requestBody) {
  const { section, company, moredetails, ...jsonStructure } = requestBody;
  if (!section || !company || !moredetails || !jsonStructure) {
    return { error: "Missing required fields" };
  }

  console.log(
    `Write a ${section} section for my website named "${company}", where we do following things ${moredetails}. The response should be in the following JSON format without any extra explanation or comments: ${JSON.stringify(jsonStructure)}`
  );

  const completion = await openai.chat.completions.create({
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    messages: [
      {
        role: "user",
        content: `Write a ${section} section for my website named "${company}", where we do following things ${moredetails}. The response should be in the following JSON format without any extra explanation or comments:
      ${JSON.stringify(jsonStructure)}`,
      },
    ],
    temperature: 0.5,
    top_p: 1,
    max_tokens: 1024,
    stream: false, // Disable streaming to directly capture full response
  });

  let response = completion.choices[0]?.message?.content?.trim() || "";
  console.log("Generated text:", response);

  // Extract the JSON from the response using regex
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("No JSON found in response:", response);
    return { error: "No JSON found in response" };
  }

  try {
    return JSON.parse(jsonMatch[0]); // Parse extracted JSON
  } catch (error) {
    console.error("Error parsing JSON:", error, "Extracted JSON text:", jsonMatch[0]);
    return { error: "Failed to parse response as JSON" };
  }
}

export async function correctContent(requestBody) {
  const { error,...jsonStructure } = requestBody;
  if (!jsonStructure) {
    return { error: "Missing required field" };
  }

  console.log(
    ` ${JSON.stringify(jsonStructure)}`
  );

  const completion = await openai.chat.completions.create({
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    messages: [
      {
        role: "user",
        content: `I am facing the issue with the following JSON format ${error}. So correct it by adding or removing (Do only one change add or remove according to needs) the fields without any extra explanation or comments:
        ${JSON.stringify(jsonStructure)}
        `,
      },
    ],
    temperature: 0.5,
    top_p: 1,
    max_tokens: 1024,
    stream: false, // Disable streaming to directly capture full response
  });

  let response = completion.choices[0]?.message?.content?.trim() || "";
  console.log("Generated text:", response);

  // Extract the JSON from the response using regex
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("No JSON found in response:", response);
    return { error: "No JSON found in response" };
  }

  try {
    return JSON.parse(jsonMatch[0]); // Parse extracted JSON
  } catch (error) {
    console.error("Error parsing JSON:", error, "Extracted JSON text:", jsonMatch[0]);
    return { error: "Failed to parse response as JSON" };
  }
}