import axios from 'axios';

const languages = {
    1: "hi",
    2: "gom",
    3: "kn",
    4: "doi",
    5: "brx",
    6: "ur",
    7: "ta",
    8: "ks",
    9: "as",
    10: "bn",
    11: "mr",
    12: "sd",
    13: "mai",
    14: "pa",
    15: "ml",
    16: "mni",
    17: "te",
    18: "sa",
    19: "ne",
    20: "sat",
    21: "gu",
    22: "or",
    23: "en"
};

const headers = {
    "Content-Type": "application/json",
    "userID": "ba058a413b024384ab74b732923ce809",
    "ulcaApiKey": "315784b568-1aac-4843-875b-3143113e78e2"
};

export async function translate(modelType, content, sourceLanguage, targetLanguage = languages[23]) {
    console.log(modelType);
    console.log(`Translating from ${sourceLanguage} to ${targetLanguage}`);

    let pipelineTasks = [
        {
            "taskType": "translation",
            "config": {
                "language": {
                    "sourceLanguage": sourceLanguage,
                    "targetLanguage": targetLanguage
                }
            }
        }
    ];

    if (modelType === 'translate-tts') {
        pipelineTasks.push({
            "taskType": "tts",
            "config": {
                "language": {
                    "sourceLanguage": targetLanguage
                }
            }
        });
    }

    const payload = {
        "pipelineTasks": pipelineTasks,
        "pipelineRequestConfig": {
            "pipelineId": "64392f96daac500b55c543cd" 
        }
    };

    try {
        const response = await axios.post('https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline', payload, { headers });

        if (response.status === 200) {
            const responseData = response.data;
            const serviceIdTranslation = responseData.pipelineResponseConfig[0].config[0].serviceId;

            let computePayload = {
                "pipelineTasks": [
                    {
                        "taskType": "translation",
                        "config": {
                            "language": {
                                "sourceLanguage": sourceLanguage,
                                "targetLanguage": targetLanguage
                            },
                            "serviceId": serviceIdTranslation
                        }
                    }
                ],
                "inputData": {
                    "input": [
                        {
                            "source": content
                        }
                    ],
                    "audio": [
                        {
                            "audioContent": null
                        }
                    ]
                }
            };

            if (modelType === 'translate-tts') {
                const serviceIdTTS = responseData.pipelineResponseConfig[1].config[0].serviceId;
                computePayload.pipelineTasks.push({
                    "taskType": "tts",
                    "config": {
                        "language": {
                            "sourceLanguage": targetLanguage
                        },
                        "serviceId": serviceIdTTS,
                        "gender": "female"
                    }
                });
            }

            const callbackUrl = responseData.pipelineInferenceAPIEndPoint.callbackUrl;
            const headers2 = {
                "Content-Type": "application/json",
                [responseData.pipelineInferenceAPIEndPoint.inferenceApiKey.name]: responseData.pipelineInferenceAPIEndPoint.inferenceApiKey.value
            };

            const computeResponse = await axios.post(callbackUrl, computePayload, { headers: headers2 });

            if (computeResponse.status === 200) {
                const computeResponseData = computeResponse.data;
                const translatedContent = computeResponseData.pipelineResponse[0].output[0].target;
                if (modelType === 'translate-tts') {
                    const audioContent = computeResponseData.pipelineResponse[1].audio[0].audioContent;
                    return {
                        status_code: 200,
                        message: "Translation and TTS successful",
                        translated_content: translatedContent,
                        audio_content: audioContent
                    };
                } else {
                    return {
                        status_code: 200,
                        message: "Translation successful",
                        translated_content: translatedContent
                    };
                }
            } else {
                console.error('Error in compute response:', computeResponse.data);
                return {
                    status_code: computeResponse.status,
                    message: "Error in translation or TTS",
                    translated_content: null,
                    audio_content: null
                };
            }
        } else {
            console.error('Error in initial response:', response.data);
            return {
                status_code: response.status,
                message: "Error in translation request",
                translated_content: null,
                audio_content: null
            };
        }
    } catch (error) {
        console.error('Internal server error:', error);
        return {
            status_code: 500,
            message: "Internal server error",
            translated_content: null,
            audio_content: null
        };
    }
}