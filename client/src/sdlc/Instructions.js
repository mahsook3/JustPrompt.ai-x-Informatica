import React, { useContext, useEffect, useState } from 'react';
import { ResponseContext } from './ResponseContext';
import { GrUpdate } from "react-icons/gr";
import Loading from '../components/Loading';

export default function Instructions() {
    const { response } = useContext(ResponseContext);
    const [instructions, setInstructions] = useState(null);
    const [error, setError] = useState(null);

    const fetchInstructions = async () => {
        try {
            const postData = { plan: response };
            console.log('Posting data:', postData);

            const res = await fetch('https://genai-jp.onrender.com/generateinstructions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Server response:', data);

            if (data.generatedInstructions && data.generatedInstructions.instructions) {
                const newInstructions = { plan: data.generatedInstructions.instructions };
                setInstructions(newInstructions);
                localStorage.setItem('instructions', JSON.stringify(newInstructions));
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            console.error('Error fetching instructions:', error);
            setError(error.message);
        }
    };

    const resetInstructions = () => {
        localStorage.removeItem('instructions');
        setInstructions(null);
    };

    useEffect(() => {
        const storedInstructions = localStorage.getItem('instructions');
        if (!storedInstructions) {
            fetchInstructions();
        } else {
            setInstructions(JSON.parse(storedInstructions));
        }
    }, [response]);

    if (error) {
        return <p>Please Start Building</p>;
    }

    if (!instructions) {
        return <Loading />;
    }

    return (
        <div className="h-screen overflow-y-auto p-5 font-sans bg-white">
            <button onClick={resetInstructions} className="reset-button float-right bg-blue-500 text-white flex items-center p-2 rounded">
                <GrUpdate className="mr-2" /> Sync
            </button>
            <h1 className="font-bold text-2xl mb-4">Project Overview</h1>
            <p className="mb-4">{instructions.plan.overview || 'No overview available'}</p>
            
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-green-100">
                <h2 className="font-bold text-xl mb-2">Tech Stack</h2>
                <p>{instructions.plan.tech_stack || 'No tech stack available'}</p>
            </div>
            
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-green-100">
                <h2 className="font-bold text-xl mb-2">Required Software</h2>
                <ul className="list-disc list-inside">
                    {(instructions.plan.required_software || '').split('\n').map((item, index) => (
                        <li key={index}>
                            {item.split('**').map((part, i) => 
                                i % 2 === 1 ? <span key={i} className="font-medium">{part}</span> : part
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-green-100">
                <h2 className="font-bold text-xl mb-2">Steps</h2>
                <ol className="list-decimal list-inside">
                    {(instructions.plan.steps || []).map((step, index) => (
                        <li key={index}>
                            {step.split('**').map((part, i) => 
                                i % 2 === 1 ? <span key={i} className="font-medium">{part}</span> : part
                            )}
                        </li>
                    ))}
                </ol>
            </div>
            
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-green-100">
                <h2 className="font-bold text-xl mb-2">Features</h2>
                <ul className="list-disc list-inside">
                    {(instructions.plan.features || []).map((feature, index) => (
                        <li key={index}>
                            {feature.split('**').map((part, i) => 
                                i % 2 === 1 ? <span key={i} className="font-medium">{part}</span> : part
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-green-100">
                <h2 className="font-bold text-xl mb-2">Files</h2>
                <ul className="list-disc list-inside">
                    {(instructions.plan.files || []).map((file, index) => (
                        <li key={index}>
                            {typeof file === 'string' ? file.split('**').map((part, i) => 
                                i % 2 === 1 ? <span key={i} className="font-medium">{part}</span> : part
                            ) : file}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}