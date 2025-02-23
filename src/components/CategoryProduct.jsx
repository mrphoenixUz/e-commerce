'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import noo from "@/images/noo.jpeg";

const CategoryProducts = ({ products, categoryName }) => {
  const router = useRouter();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});

  const nextImage = (productId) => {
    setImageIndexes(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % products.find(p => p.id === productId).pictures.length
    }));
  };

  const prevImage = (productId) => {
    setImageIndexes(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + products.find(p => p.id === productId).pictures.length) % products.find(p => p.id === productId).pictures.length
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-gray-900 relative">
            {categoryName || 'Category Not Found'}
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500"></span>
          </h1>
          <p className="text-gray-600">{products.length} Products</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏷️</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h2>
            <p className="text-gray-500">Check back later for new additions to this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.pictures[0] ? `http://localhost:3003${product.pictures[imageIndexes[product.id] || 0]}` : noo.src}
                    alt={product.product_name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />

                  {hoveredProduct === product.id && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(product.id); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(product.id); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {product.pictures.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${(imageIndexes[product.id] || 0) === idx ? 'bg-white w-3' : 'bg-white/60'
                          }`}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.product_name}
                    </h2>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ${parseFloat(product.price).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>

                  <button
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;