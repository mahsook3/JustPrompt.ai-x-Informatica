'use client'

import { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

export default function ProductsList({ products, primaryColor }) {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 4);

  if (!products) {
    return null;
  }

  return (
    <div>
      {products.length > 4 && (
        <div className="flex justify-end p-4">
          <button 
            className="text-blue-500 hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 text-black">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 relative">
            {/* Wishlist Button */}
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
              <Heart className="w-5 h-5" />
            </button>
            
            {/* Labels */}
            <div className="absolute top-2 left-2 flex gap-2">
              {product.isNew && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{product.discount}</span>
              )}
            </div>

            {/* Product Image */}
            <div className="mb-4">
              <img 
                src={product.image || "/placeholder.svg"} 
                alt={product.name}
                className="w-full h-48 object-contain"
              />
            </div>

            {/* Category */}
            {product.category && (
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
            )}

            {/* Product Name */}
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Minimum Order */}
            <div className="text-sm text-gray-600 mb-4">
              Minimum order: {product.minOrder} units
            </div>

            {/* Order Button */}
            <button 
              className="w-full text-white py-2 px-4 rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: primaryColor }}
            >
              <ShoppingCart className="w-5 h-5" />
              ORDER
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}