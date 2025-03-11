import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function ChatbotInterface({ onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    create: '',
    projectName: '',
    separateFiles: '',
    zip: ''
  });
  const [messages, setMessages] = useState([
    { type: 'bot', text: "What do you need to create?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [plan, setPlan] = useState(null);
  const chatAreaRef = useRef(null);

  const defaultQuestions = [
    "What do you need to create?",
    "Your project name",
    "Do you want separate files for each task?",
    "Do you want it as a zip?"
  ];

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

  const questions = [...defaultQuestions, ...additionalQuestions.map(q => q.question)];

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(async () => {
        setLoading(false);
        if (step < defaultQuestions.length - 1) {
          setStep(step + 1);
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'bot', text: questions[step + 1] }
          ]);
        } else if (step === defaultQuestions.length - 1) {
          try {
            const response = await axios.post('https://genai-jp.onrender.com/generateQuestions', {
              create: answers.create,
              projectName: answers.projectName,
              separateFiles: answers.separateFiles
            });
            const newQuestions = response.data.questions.questions;
            setAdditionalQuestions(newQuestions);
            localStorage.setItem('additionalQuestions', JSON.stringify(newQuestions));
            setStep(step + 1);
            setMessages((prevMessages) => [
              ...prevMessages,
              { type: 'bot', text: newQuestions[0].question }
            ]);
          } catch (error) {
            console.error('Error fetching additional questions:', error);
          }
        } else if (step < questions.length - 1) {
          setStep(step + 1);
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'bot', text: questions[step + 1] }
          ]);
        } else {
          try {
            const response = await axios.post('https://genai-jp.onrender.com/generateProject', answers);
            const { plan } = response.data;
            setPlan(plan);
            localStorage.setItem('projectPlan', JSON.stringify(plan));
            const formattedSteps = plan.steps.map((step, index) => {
              if (Array.isArray(step.details)) {
                return [
                  { type: 'bot', text: step.step, bold: true },
                  ...step.details.map(detail => ({ type: 'bot', text: `${detail.fileName}: ${detail.description}` }))
                ];
              } else {
                return { type: 'bot', text: `${step.step}: ${step.details}`, bold: true };
              }
            }).flat();
            setMessages((prevMessages) => [
              ...prevMessages,
              { type: 'bot', text: 'Project Plan:' },
              ...formattedSteps
            ]);
          } catch (error) {
            console.error('Error generating project:', error);
          }
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, step, questions, answers, additionalQuestions]);

  useEffect(() => {
    if (loading && step >= questions.length) {
      const timer = setTimeout(() => {
        const nextLoadingMessage = loadingMessages.shift();
        if (nextLoadingMessage) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'bot', text: nextLoadingMessage }
          ]);
        } else {
          setLoading(false);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, step]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);

    const newAnswers = { ...answers };
    if (step < defaultQuestions.length) {
      switch (step) {
        case 0:
          newAnswers.create = input;
          break;
        case 1:
          newAnswers.projectName = input;
          break;
        case 2:
          newAnswers.separateFiles = input;
          break;
        case 3:
          newAnswers.zip = input;
          break;
        default:
          break;
      }
    } else {
      const questionIndex = step - defaultQuestions.length;
      const questionText = additionalQuestions[questionIndex].question;
      newAnswers[questionText] = input;
    }
    setAnswers(newAnswers);

    setLoading(true);
    setInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleDownload = async () => {
    if (!plan) return;
  
    try {
      const response = await axios.post('https://genai-jp.onrender.com/appendjson', {
        plan: plan
      });
  
      const { combinedResults } = response.data;
      localStorage.setItem('combinedResults', JSON.stringify(combinedResults));
  
      const zip = new JSZip();
      combinedResults.forEach(file => {
        zip.file(file.fileName, file.code);
      });
  
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'project.zip');
    } catch (error) {
      console.error('Error generating code:', error);
    }
  };

  const handleStartAgain = () => {
    window.location.reload();
  };

  return (
<>
  <div className="flex h-screen">
    {/* Sidebar */}
    <div className="flex flex-col flex-grow">
  
      {/* Chat Area */}
      <div ref={chatAreaRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`${
                message.type === 'user' ? 'bg-green-400 text-white' : 'bg-gray-300 text-gray-800'
              } rounded-lg p-4 max-w-xs`}
            >
              <span className={message.bold ? 'font-bold' : ''}>{message.text}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start bg-gray-100">
            <div className="shadow rounded-md p-4 max-w-sm w-full bg-gray-300">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="space-y-2">
                    <div className="h-4 bg-green-400 rounded" />
                    <div className="h-4 bg-green-400 rounded w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Input Area */}
      {!plan && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
            />
            <button
              onClick={handleSend}
              className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
      {/* Download and Start Again Buttons */}
      {plan && (
        <div className="p-4 bg-white border-t border-gray-200 flex space-x-2">
          <button
            onClick={handleDownload}
            className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Download Project
          </button>
          <button
            onClick={handleStartAgain}
            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Start Again
          </button>
        </div>
      )}
    </div>
  </div>
</>
  );
}