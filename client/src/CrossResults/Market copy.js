import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import CommodityData from '../Data/a-commodity.json'
import { Loader2 } from 'lucide-react'

const Card = ({ title, description, children }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
)

export default function StandaloneExportAnalysisDashboard({
  exportingCountry,
  destinationCountry,
  businessDetails,
  products,
  selectedState,
  selectedDistrict,
  keywords
}) {
  const [rawData, setRawData] = useState(null)
  const [commodityDetails, setCommodityDetails] = useState(null)
  const [countryDetails, setCountryDetails] = useState(null)
  const [selectedCommodity, setSelectedCommodity] = useState(CommodityData[0])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const commodityDetailsResponse = await axios.post('https://cross-intelligence-50023657941.development.catalystappsail.in/commodity-details', {
        query: `${selectedCommodity.commodity} ${keywords}`
      })
      setCommodityDetails(commodityDetailsResponse.data[0])
  
      const countryDetailsResponse = await axios.post('https://cross-intelligence-50023657941.development.catalystappsail.in/country-details', {
        query: destinationCountry
      })
      setCountryDetails(countryDetailsResponse.data[0])
  
      const { commodity_grp_id, comdty_id } = commodityDetailsResponse.data[0]
      const { region_id, country_id } = countryDetailsResponse.data[0]
  
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      const targetUrl = `https://niryat.gov.in/group_data?start_date=202404&end_date=202410&sort_table=export_achieved-sort-desc&commodity_group_id=${commodity_grp_id}&commodity_id=${comdty_id}&country_id=${country_id}&region_id=${region_id}`
  
      const rawDataResponse = await axios.get(proxyUrl + targetUrl, {
        headers: {
          'accept': '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'pragma': 'no-cache',
          'referer': 'https://niryat.gov.in/',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'x-requested-with': 'XMLHttpRequest'
        }
      })
      setRawData(rawDataResponse.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      alert(`Error fetching data: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!rawData || !commodityDetails || !countryDetails) {
    return <div>Loading...</div>
  }

  const monthlyData = rawData.commodity_group_data_for_all_month.map(item => ({
    month: new Date(item.monthyr.toString().slice(0, 4), item.monthyr.toString().slice(4) - 1).toLocaleString('default', { month: 'short' }),
    value: item.export_achieved
  }))

  const performanceData = [
    { metric: "Export Achieved", value: rawData.region_data[0].export_achieved },
    { metric: "Export Latest", value: rawData.region_data[0].export_lat },
    { metric: "Export Previous", value: rawData.region_data[0].export_prev }
  ]

  const growthData = [
    { metric: "MoM Growth", value: rawData.region_data[0].mom },
    { metric: "Average MoM Growth", value: rawData.region_data[0].mom_avg },
    { metric: "Current Growth", value: rawData.region_data[0].cur_growth },
    { metric: "Deviation", value: rawData.region_data[0].deviation }
  ]

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Market Analysis</h1>
      
      {/* Commodity Selector */}
      <div className="mb-8">
      <label htmlFor="commodity-selector" className="block text-gray-700 font-medium mb-2">Select Commodity:</label>
      <p className="text-red-500">Low accuracy detected. Please ensure selected commodity matches your commodity.</p>        <select
          id="commodity-selector"
          value={selectedCommodity.comdty_id}
          onChange={(e) => {
            const selected = CommodityData.find(c => c.comdty_id === parseInt(e.target.value))
            setSelectedCommodity(selected)
          }}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
        >
          {CommodityData.map(commodity => (
            <option key={commodity.comdty_id} value={commodity.comdty_id}>
              {commodity.commodity}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Monthly Export Performance" description="Export achieved per month in 2024">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="Export Value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Export Performance Metrics" description="Comparison of key export metrics">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Growth and Deviation Metrics" description="Analysis of growth rates and deviation">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Key Statistics" description="Summary of important export statistics">
          <ul className="space-y-2 text-gray-700">
            <li><strong>Region:</strong> {rawData.region_data[0].region_name}</li>
            <li><strong>Country:</strong> {rawData.country_data[0].country_name}</li>
            <li><strong>Commodity Group:</strong> {rawData.commodity_data[0].commodity_group}</li>
            <li><strong>Commodity:</strong> {rawData.commodity_data[0].commodity}</li>
            <li><strong>Total Export Achieved:</strong> ${(rawData.region_data[0].export_achieved / 1000000).toFixed(2)} million</li>
            <li><strong>Current Growth:</strong> {rawData.region_data[0].cur_growth.toFixed(2)}%</li>
            <li><strong>Month-over-Month Growth:</strong> {rawData.region_data[0].mom.toFixed(2)}%</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}