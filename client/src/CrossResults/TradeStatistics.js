import React, { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import countryCode from '../Data/countries.json';

// Helper function to format large numbers
function formatNumber(num) {
  return new Intl.NumberFormat('en-US', { 
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num);
}

// Helper function to get country flag emoji
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function TradeStatsCard({ destinationCountry, selectedHSN }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const result = await response.json();
        setExchangeRate(result.rates.INR);
        console.log('Exchange rate fetched:', result.rates.INR);
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (!selectedHSN || !exchangeRate) return;
  
    console.log('Destination Country:', destinationCountry);
    console.log('Country Codes:', countryCode);
  
    const country = countryCode.find(c => c.name === destinationCountry);
    if (!country) {
      setError(new Error('Country not found'));
      setLoading(false);
      return;
    }
  
    const reporterIso = country.iso;
    const fetchData = async () => {
      try {
        let productCode = selectedHSN.toString();
        const originalProductCode = productCode;
        let result = null;
        while (productCode.length > 1) {
          const apiUrl = `https://webgate.ec.europa.eu/flows/public/v1/stats?reporter=${reporterIso}&partner=IN&product=${productCode}&years=2023&includeUK=false&lang=EN`;
          console.log('url')
          const response = await fetch(apiUrl);
          if (response.ok) {
            result = await response.json();
            console.log('Data fetched:', result);
            if (result.rows && result.rows[0] && result.rows[0].samples && result.rows[0].samples[2023]) {
              setData({ ...result, product: originalProductCode, processedProduct: productCode });
              break;
            }
          }
          productCode = productCode.slice(0, -1);
        }
        if (!result) {
          setData({ product: originalProductCode, processedProduct: productCode, noData: true });
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [destinationCountry, selectedHSN, exchangeRate]);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!selectedHSN) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">Select an HSN code to view trade statistics</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">Selected item does not have data</p>
      </div>
    );
  }

  if (data.noData) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trade Statistics 2023</h2>
          <div className="flex items-center space-x-2">
            <span className="text-3xl" aria-label={`Flag of ${destinationCountry}`}>{getFlagEmoji(countryCode.find(c => c.name === destinationCountry).iso)}</span>
            <span className="text-xl">↔️</span>
            <span className="text-3xl" aria-label={`Flag of India`}>{getFlagEmoji('IN')}</span>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Product Code: {data.product} ({data.processedProduct}) | Reporter: {destinationCountry} | Partner: India
          </p>
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            No data available for this product.
          </p>
        </div>
      </div>
    );
  }

  const { reporter, partner, rows } = data;
  const stats = rows[0].samples[2023];
  const importValueInINR = stats.importValue * exchangeRate;
  const exportValueInINR = stats.exportValue * exchangeRate;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trade Statistics 2023</h2>
        <div className="flex items-center space-x-2">
          <span className="text-3xl" aria-label={`Flag of ${reporter.name}`}>{getFlagEmoji(reporter.iso)}</span>
          <span className="text-xl">↔️</span>
          <span className="text-3xl" aria-label={`Flag of ${partner.name}`}>{getFlagEmoji(partner.iso)}</span>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Product Code: {data.product} {data.product !== data.processedProduct ? `(${data.processedProduct})` : ''} | Reporter: {reporter.name} | Partner: {partner.name}
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-blue-600 dark:text-blue-400">
              <ArrowDownLeft className="mr-2 h-5 w-5" />
              Imports
            </h3>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Value:</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{formatNumber(importValueInINR)} ₹</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Quantity:</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{formatNumber(stats.importQuantity)} tons</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-green-600 dark:text-green-400">
              <ArrowUpRight className="mr-2 h-5 w-5" />
              Exports
            </h3>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Value:</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{formatNumber(exportValueInINR)} ₹</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Quantity:</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{formatNumber(stats.exportQuantity)} tons</span>
            </div>
          </div>
        </div>
      </div>
      {selectedHSN && (
        <div className="mt-4">
        </div>
      )}
    </div>
  );
}