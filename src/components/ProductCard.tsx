
import React, { useState } from 'react';
import { Star, Leaf, Plus, Award, ImageOff } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  sustainabilityScore: number;
  carbonFootprint: number;
  image: string;
  category: string;
  certifications: string[];
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getSustainabilityColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600 bg-green-100';
    if (score >= 7.0) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSustainabilityLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    return 'Fair';
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 group hover:scale-105">
      <div className="relative overflow-hidden">
        {imageLoading && (
          <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <ImageOff className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 ${
              imageLoading ? 'hidden' : ''
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${getSustainabilityColor(product.sustainabilityScore)}`}>
            {getSustainabilityLabel(product.sustainabilityScore)}
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Leaf className="h-4 w-4 text-green-500" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</h3>
          <span className="text-lg font-bold text-green-600">${product.price}</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-green-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">{product.sustainabilityScore}</span>
          </div>
          <div className="text-xs text-gray-500">
            {product.carbonFootprint}kg CO₂
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.certifications.slice(0, 2).map((cert, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium"
            >
              <Award className="h-3 w-3 mr-1" />
              {cert}
            </span>
          ))}
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl"
        >
          <Plus className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
