
import React from 'react';
import { Star, Sparkles } from 'lucide-react';

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

interface ProductRecommendationsProps {
  currentProduct: Product;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProduct,
  allProducts,
  onProductClick,
}) => {
  // Get recommendations based on category and sustainability score
  const recommendations = allProducts
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || 
       Math.abs(product.sustainabilityScore - currentProduct.sustainabilityScore) <= 1)
    )
    .sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
    .slice(0, 4);

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-900">Recommended for You</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
              {product.name}
            </h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-600 font-bold text-lg">${product.price}</span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600">{product.sustainabilityScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
