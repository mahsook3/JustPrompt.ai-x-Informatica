import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

export default function LiveWebditesDetails() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const liveProducts = userDetails?.liveProducts || [];

    const fetchProductDetails = async (productID) => {
      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/justpromptclientmodel/${productID}`, {
        headers: {
          projectId: '66dc452ca54723b1c14ba1e9',
          environmentId: '66dc452ca54723b1c14ba1ea'
        }
      });
      return response.json();
    };

    const loadProducts = async () => {
      const productDetails = await Promise.all(liveProducts.map(product => fetchProductDetails(product.productID)));
      const productsWithStatus = productDetails.map((details, index) => {
        const isActive = details.title !== null && details.description !== null && liveProducts[index].version !== null;
        return {
          ...details,
          version: liveProducts[index].version,
          status: isActive ? 'Active' : 'Inactive'
        };
      });
      setProducts(productsWithStatus);
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
            <p className="text-lg text-gray-600 mb-6">
                It looks like we don't have any products listed at the moment. Start by creating an AI flowchart to develop your menu.
            </p>
            <Link 
    to="/builder/flow"
    className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
>
    Get Started
</Link>
        </div>
    );
}

  return (
    <div className="shadow-lg rounded-lg overflow-hidden ml-4 mr-4">
      <table className="w-full table-fixed">
        <thead className="sticky top-0 bg-gray-200">
          <tr>
            <th className="w-1/4 py-4 px-6 text-left text-gray-700 font-bold uppercase">Title</th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-700 font-bold uppercase">Description</th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-700 font-bold uppercase">Version</th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-700 font-bold uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {products.map((product, index) => (
            <tr key={product._id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
              <td className="py-4 px-6">{product.title}</td>
              <td className="py-4 px-6 truncate">{product.description}</td>
              <td className="py-4 px-6">{product.version}</td>
              <td className="py-4 px-6">
                <span className={`py-1 px-2 rounded-full text-xs ${product.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}