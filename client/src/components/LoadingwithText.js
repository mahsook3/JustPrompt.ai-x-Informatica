import React, { useState, useEffect } from 'react';

export default function LoadingwithText() {
    const loadingMessages = [
        "Planning the project scope",
        "Designing the user interface",
        "Building the workflows",
        "Configuring integrations and settings",
        "Testing for functionality",
        "Deploying the solution",
        "Monitoring performance and usage",
        "Iterating based on feedback",
        "Automating repetitive tasks",
        "Scaling as the app grows"
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            setCurrentCharIndex((prevIndex) => {
                if (prevIndex < loadingMessages[currentMessageIndex].length) {
                    return prevIndex + 1;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
                        setCurrentCharIndex(0);
                    }, 2000); // Wait 2 seconds before moving to the next message
                    return prevIndex;
                }
            });
        }, 100); // Typing speed: 100ms per character

        return () => clearInterval(typingInterval); // Cleanup interval on component unmount
    }, [currentMessageIndex, loadingMessages]);

    return (
        <div style={styles.container}>
            <p style={styles.text}>{loadingMessages[currentMessageIndex].substring(0, currentCharIndex)}</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    text: {
        fontSize: '1.5rem',
    },
};