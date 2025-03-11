// chatbot/Flowchart.js
import React, { useState, useEffect } from 'react';
import Flowchart from 'react-simple-flowchart';

const Flowdemo = ({ code = '', options = {} }) => {

  console.log("Flowdemo.js: code received: ", code);

  const defaultOptions = {
    x: 0,
    y: 0,
    'line-width': 3,
    'line-length': 50,
    'text-margin': 10,
    'font-size': 14,
    'font-color': 'black',
    'line-color': 'black',
    'element-color': 'black',
    fill: 'white',
    'arrow-end': 'block',
    scale: 1,
    'font-family': 'Arial, Helvetica, sans-serif',
    'background-color': '#f0f0f0',
    'shadow': true,
    'shadow-color': '#d3d3d3',
    symbols: {
      start: {
        'font-color': 'white',
        'element-color': '#4CAF50',
        'font-weight': 'bold',
        'fill': '#4CAF50',
      },
      end: {
        'font-color': 'white',
        'element-color': '#f44336',
        'font-weight': 'bold',
        'fill': '#f44336',
      },
      operation: {
        'font-color': 'white',
        'element-color': '#40dc8b',
        'fill': '#40dc8b',
      },
      condition: {
        'font-color': 'black',
        'element-color': '#FFC107',
        'fill': '#FFC107',
      },
    },
  };

  const [chartCode, setChartCode] = useState(code);
  const [chartOptions, setChartOptions] = useState(defaultOptions);

  useEffect(() => {
    if (code) {
      setChartCode(code);  // Directly set the code without any replacement or formatting
    }
    if (Object.keys(options).length) {
      setChartOptions(options);
    }
  }, [code, options]);

  return (
    <div>
      <Flowchart chartCode={chartCode} options={chartOptions} />
    </div>
  );
};

export default Flowdemo;
