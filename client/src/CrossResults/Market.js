'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import axios from 'axios'
import Loading from '../components/Loading'
import { useSelector } from 'react-redux'
import {  AlertCircle } from 'lucide-react';


export default function TradeDashboard() {
  const { products, keywords } = useSelector((state) => state.form.formData)
  const [hsnCodes, setHsnCodes] = useState([])
  const [selectedHsn, setSelectedHsn] = useState('')
  const [data, setData] = useState([])
  const [averageTradeAmount, setAverageTradeAmount] = useState(0)
  const [top10TradeAmounts, setTop10TradeAmounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loadingHsn, setLoadingHsn] = useState(true)

  useEffect(() => {
    const fetchHsnCodes = async () => {
      try {
        const query = `${products} ${keywords}`
        const response = await axios.post('https://cross-intelligence-50023657941.development.catalystappsail.in/hsn-gst-detail', { query })
        setHsnCodes(response.data)
        if (response.data.length > 0) {
          setSelectedHsn(response.data[0].HSN)
        }
        setLoadingHsn(false)
      } catch (error) {
        console.error('Error fetching HSN codes:', error)
        setLoadingHsn(false)
      }
    }

    fetchHsnCodes()
  }, [products, keywords])

  useEffect(() => {
    if (!selectedHsn) {
      console.log('No HSN selected') // Debugging statement
      return
    }

    const fetchData = async () => {
      setLoading(true)
      console.log('Fetching data for HSN:', selectedHsn) // Debugging statement
      try {
        const response = await fetch('https://cross-intelligence-50023657941.development.catalystappsail.in/trade-statistics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ProductCode: selectedHsn })
        })
        const result = await response.json()
        const filteredData = result.filter(item => item.TradeAmount !== null)

        sessionStorage.setItem('tradeData', JSON.stringify(filteredData))

        setData(filteredData)

        const totalTradeAmount = filteredData.reduce((sum, item) => sum + item.TradeAmount, 0)
        setAverageTradeAmount(totalTradeAmount / filteredData.length)

        let uniqueTop10 = [...new Map(filteredData.map(item => [item.PartnerCountry, item])).values()]
          .sort((a, b) => b.TradeAmount - a.TradeAmount)
          .slice(0, 10)

        const japan = filteredData.find(item => item.PartnerCountry === 'Japan')
        if (japan && !uniqueTop10.some(item => item.PartnerCountry === 'Japan')) {
          uniqueTop10.pop()
          uniqueTop10.push(japan)
          uniqueTop10.sort((a, b) => b.TradeAmount - a.TradeAmount)
        }

        setTop10TradeAmounts(uniqueTop10)
        setLoading(false) // Ensure loading is set to false here
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to fetch data')
        setLoading(false) // Ensure loading is set to false here
      }
    }

    fetchData()
  }, [selectedHsn])

  if(!products || !keywords) {
    return (
      <div className="flex items-center justify-center text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Please fill the Product Details to get the results</span>
      </div>
    );
  }

  const getLineColor = (country) => {
    return country === 'Liberia' ? '#FF6B6B' : '#4ECDC4'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-8"
    >
      <div className="mb-8">
        <label htmlFor="hsn-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select HSN Code
        </label>
        <div className="relative">
          <select
            id="hsn-select"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedHsn}
            onChange={(e) => {
              console.log('Selected HSN:', e.target.value) // Debugging statement
              setSelectedHsn(e.target.value)
            }}
          >
            {loadingHsn ? (
              <option>Loading...</option>
            ) : (
              <>
                <option value="">Select HSN Code</option>
                {hsnCodes.map((item) => (
                  <option key={item.HSN} value={item.HSN}>
                    {item.HSN} - {item.description}
                  </option>
                ))}
              </>
            )}
          </select>
          {loadingHsn && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
      {selectedHsn && (
        <>
          {loading ? (
            <Loading />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Trade Statistics</h2>
                <p className="text-gray-600">Average Trade Amount: ${averageTradeAmount.toFixed(2)}</p>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Top 10 Trade Amounts:</h3>
                  <ul className="list-disc list-inside">
                    {top10TradeAmounts.map((item, index) => (
                      <li key={index} className="text-gray-600">
                        {item.PartnerCountry}: ${item.TradeAmount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={top10TradeAmounts}>
                    <XAxis dataKey="PartnerCountry" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white border border-gray-200 p-4 rounded shadow-md">
                              <p className="font-semibold">{data.PartnerCountry}</p>
                              <p className="text-gray-600">Trade Amount: ${data.TradeAmount.toFixed(2)}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line type="monotone" dataKey="TradeAmount" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </>
      )}
    </motion.div>
  )
}