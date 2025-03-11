import React, { useContext } from 'react';
import { ResponseContext } from './ResponseContext';

export default function Plan() {
    const { response } = useContext(ResponseContext);

    if (!response || !response.plan) {
        return <p className='ml-5'>Please Start Building</p>;
    }

    const plan = response.plan;

    return (
        <div className="p-4">
            {plan.steps.map((step, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-green-100">
                    <h2 className="text-xl font-semibold mb-2">{step.step}</h2>
                    {Array.isArray(step.details) ? (
                        <ul className="list-disc list-inside">
                            {step.details.map((detail, idx) => (
                                <li key={idx} className="ml-4">
                                    {typeof detail === 'string' ? detail : (
                                        <div>
                                            <span className="font-medium">{detail.fileName}</span>: {detail.description}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{step.details}</p>
                    )}
                </div>
            ))}
        </div>
    );
}