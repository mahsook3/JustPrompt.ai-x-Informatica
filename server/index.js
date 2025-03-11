import express from 'express';
// import multer from 'multer';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import authRoutes from './models/login-signup.js';
import { getEUTradeStatistics } from './models/eu-trade-statistics.js';
import { searchAmazonSellerCentral } from './models/amazon-seller-central.js';
import { HSNandGSTdetails } from './models/hsn-gst-details.js';
import { harmonisationOfScheduleII } from './models/harmonisation-of-schedule-II.js';
import { getRoDTEPDataByHSN } from './models/RoDTEP.js';
import { getGeographicalIndicationByState } from './models/geographical-indication-tag.js';
import { generateProductDetails } from './models/extract-products.js';
import { ODOPdetails } from './models/odop-products.js';
import { generateResponse, generateSummary, generateContent, correctContent } from './generate-responses.js';
import { searchAmazonProductCategory } from './models/amazon-product-category.js';
import { generateProductKeywords } from './models/extract-keywords.js';
import { commodityDetails } from './models/commodity-details.js';
import { countryDetails } from './models/country-details.js';
import { dutyDrawback } from './models/duty-drawback.js';
import pdf from 'pdf-creator-node';
import { generatePDF } from './models/generate-pdf.js'; 
import { translate } from './models/translation-service.js';
import { tradeDataGet } from './models/trade-data.js'
import { postUserDetails, getUserDetailsByEmail, updateUserDetailsByEmail } from './models/user-details.js';
import { searchGSTdetails } from './models/gst-details.js';
import { searchExportPromotionCouncil } from './models/export-promotion-councils.js';
import { councilsDetails } from './models/getall-export-promotion-councils.js';
// import { uploadImage } from './models/image-upload.js';
// import { posttemplateDetails,getTemplateDetailsById } from './models/template-data.js';

const app = express();
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 8080;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.json());

// app.use('/api/auth', authRoutes);

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// app.post('/upload-image', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             res.status(400).send('Please upload an image');
//             return;
//         }
//         const imageUrl = await uploadImage(req.file);
//         res.json({ imageUrl });
//     } catch (err) {
//         console.error('Error uploading image:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.post('/post-template-details', async (req, res) => {
//     try {
//         const response = await posttemplateDetails(req.body);
//         res.json(response);
//     } catch (err) {
//         console.error(err.stack);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/get-template-details/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const response = await getTemplateDetailsById(id);
//         res.json(response);
//     } catch (err) {
//         console.error(err.stack);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.post('/user-details', async (req, res) => {
    try {
        const userDetails = req.body;
        if (!userDetails) {
            res.status(400).send('Please provide user details');
            return;
        }
        const response = await postUserDetails(userDetails);
        res.json(response);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/user-details/:email', async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            res.status(400).send('Please provide an email');
            return;
        }
        const response = await getUserDetailsByEmail(email);
        res.json(response);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.patch('/user-details/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updateFields = req.body;
        if (!email || !updateFields) {
            res.status(400).send('Please provide an email and fields to update');
            return;
        }
        const response = await updateUserDetailsByEmail(email, updateFields);
        res.json(response);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/genarate-summary', async (req, res) => {
    try {
      const {prompt} = req.body;
      if (!prompt) {
        res.status(400).send('Please provide a prompt to search');
        return;
      }
  
      const response = await generateSummary(prompt);
      
      // Directly return the parsed JSON response
      res.json(response);
    } catch (err) {
      console.error(err.stack);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/translate', async (req, res) => {
    try {
        const requestBody = req.body;
        console.log('Request Body:', requestBody);

        if (!requestBody || Object.keys(requestBody).length === 0 || !requestBody.sourceLanguage) {
            res.status(400).send('Please provide all required fields including sourceLanguage');
            return;
        }

        const sourceLanguage = requestBody.sourceLanguage;
        const targetLanguage = requestBody.targetLanguage;
        const translatedContent = {};

        for (const key in requestBody) {
            if (requestBody.hasOwnProperty(key) && key !== 'sourceLanguage' && key !== 'targetLanguage') {
                if (key === 'keywords' && Array.isArray(requestBody[key])) {
                    translatedContent.keywords = [];
                    for (const keyword of requestBody.keywords) {
                        const translatedValue = await translate('translation', keyword, sourceLanguage, targetLanguage);
                        console.log('Translated Value:', translatedValue);
                        translatedContent.keywords.push(translatedValue.translated_content);
                    }
                } else if (key === 'objects' && Array.isArray(requestBody[key])) {
                    translatedContent.objects = [];
                    for (const object of requestBody.objects) {
                        const translatedValue = await translate('translation', object, sourceLanguage, targetLanguage);
                        console.log('Translated Value:', translatedValue);
                        translatedContent.objects.push(translatedValue.translated_content);
                    }
                } else {
                    const translatedValue = await translate('translation', requestBody[key], sourceLanguage, targetLanguage);
                    console.log('Translated Value:', translatedValue);
                    translatedContent[key] = translatedValue.translated_content;
                }
            }
        }

        res.json(translatedContent);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/amazon-seller-central', async (req, res) => {
    try {
      const {query, documents} = req.body;
      if (!query || !documents) {
        res.status(400).send('Please provide a query and documents to search');
        return;
      }
  
      const response = await generateResponse(query, documents);
      
      // Directly return the parsed JSON response
      res.json(response);
    } catch (err) {
      console.error(err.stack);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.post('/amazon-product-category', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        const documents = await searchAmazonProductCategory(query);
        res.json({ documents });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/gst-details', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        const documents = await searchGSTdetails(query);
        res.json({ documents });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/export-promotion-councils', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        const documents = await searchExportPromotionCouncil(query);
        res.json({ documents });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/councils-details', async (req, res) => {
    try {

        const results = await councilsDetails();
        res.json(results);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/harmonisation-of-schedule-II', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        const results = await harmonisationOfScheduleII(query);
        res.json(results);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/hsn-gst-detail', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        const results = await HSNandGSTdetails(query);
        res.json(results);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/trade-statistics', async (req, res) => {
    try {
        let { ProductCode } = req.body;
        if (!ProductCode) {
            res.status(400).send('Please provide a ProductCode to search');
            return;
        }
        if (ProductCode.length > 4) {
            ProductCode = Number(ProductCode.substring(0, 4));
        } else {
            ProductCode = Number(ProductCode);
        }
        const results = await tradeDataGet(ProductCode);
        res.json(results);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/rodtep', async (req, res) => {
    try {
        const hsnCode = req.body.hsnCode;
        if(!hsnCode) {
            res.status(400).send('Please provide a HSN code to search');
            return;
        }
        const result = await getRoDTEPDataByHSN(hsnCode);
        res.json(result);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/geographical-indication', async (req, res) => {
    try {
        const state = req.body.state;
        if(!state) {
            res.status(400).send('Please provide a state to search');
            return;
        }
        const results = await getGeographicalIndicationByState(state);
        res.json(results);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/odop-details', async (req, res) => {
    try {
        const { state, district } = req.body;
        if (!state && !district) {
            res.status(400).send('Please provide a state or district to search');
            return;
        }
        const results = await ODOPdetails(state, district);
        res.json(results);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/eu-trade-statistics', async (req, res) => {
    try {
        const hsnCode = req.body.hsnCode;
        const year = req.body.year || 2023;
        if (!hsnCode || !year) {
            res.status(400).send('Please provide both HSN code and year to search');
            return;
        }
        const data = await getEUTradeStatistics(hsnCode, year);
        res.json(data);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

// New endpoint to handle paragraph input
app.post('/generate-product-details', async (req, res) => {
    try {
        const paragraph = req.body.paragraph;
        if (!paragraph) {
            res.status(400).send('Please provide a paragraph to process');
            return;
        }
        const productDetails = await generateProductDetails(paragraph);
        res.json(productDetails);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/generate-keywords', async (req, res) => {
    try {
        const paragraph = req.body.paragraph;
        if (!paragraph) {
            res.status(400).send('Please provide a paragraph to process');
            return;
        }
        const keywords = await generateProductKeywords(paragraph);
        res.json(keywords); // Directly return the array
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/commodity-details', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        console.log('Query:', query);
        const documents = await commodityDetails(query);
        res.json(documents);

    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/country-details', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        console.log('Query:', query);
        const documents = await countryDetails(query);
        res.json(documents);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/duty-drawback', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            res.status(400).send('Please provide a query to search');
            return;
        }
        console.log('Query:', query);
        const documents = await dutyDrawback(query);
        res.json(documents);
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});