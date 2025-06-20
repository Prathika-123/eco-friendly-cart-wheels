
import React, { useState } from 'react';
import { Leaf, ShoppingCart, Star, TreePine, Recycle, Award } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { SustainabilityScore } from '@/components/SustainabilityScore';

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

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    sustainabilityScore: 9.2,
    carbonFootprint: 2.1,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    certifications: ["Organic", "Fair Trade"],
    description: "100% organic cotton, ethically sourced"
  },
  {
    id: 2,
    name: "Bamboo Water Bottle",
    price: 24.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 1.5,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Lifestyle",
    certifications: ["Biodegradable", "BPA-Free"],
    description: "Reusable bamboo fiber water bottle"
  },
  {
    id: 3,
    name: "Solar Power Bank",
    price: 49.99,
    sustainabilityScore: 8.5,
    carbonFootprint: 3.2,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "Electronics",
    certifications: ["Solar Powered", "Recyclable"],
    description: "Portable solar-powered charging device"
  },
  {
    id: 4,
    name: "Recycled Notebook Set",
    price: 15.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 0.8,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    category: "Stationery",
    certifications: ["100% Recycled", "FSC Certified"],
    description: "Made from 100% recycled paper materials"
  },
  {
    id: 5,
    name: "LED Plant Grow Light",
    price: 39.99,
    sustainabilityScore: 7.8,
    carbonFootprint: 2.8,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    category: "Garden",
    certifications: ["Energy Efficient", "Long-lasting"],
    description: "Energy-efficient LED grow light for plants"
  },
  {
    id: 6,
    name: "Biodegradable Phone Case",
    price: 19.99,
    sustainabilityScore: 8.9,
    carbonFootprint: 1.2,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    category: "Electronics",
    certifications: ["Biodegradable", "Compostable"],
    description: "Plant-based biodegradable phone protection"
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Clothing', 'Lifestyle', 'Electronics', 'Stationery', 'Garden'];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const filteredProducts = selectedCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const totalCarbonSaved = cart.reduce((total, item) => {
    return total + (5 - item.carbonFootprint) * item.quantity;
  }, 0);

  const averageSustainabilityScore = cart.length > 0 
    ? cart.reduce((total, item) => total + item.sustainabilityScore * item.quantity, 0) / cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  GreenCart
                </h1>
                <p className="text-sm text-green-600 font-medium">Sustainable Shopping Made Easy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SustainabilityScore score={averageSustainabilityScore} />
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop for a <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Greener Future</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover eco-friendly products with sustainability scores, carbon footprint tracking, and green alternatives for conscious shopping.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <TreePine className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalCarbonSaved.toFixed(1)} kg</div>
              <div className="text-sm text-gray-600">CO₂ Saved</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <Recycle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{mockProducts.length}</div>
              <div className="text-sm text-gray-600">Eco Products</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <Award className="h-8 w-8 text-teal-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">8.7</div>
              <div className="text-sm text-gray-600">Avg Sustainability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-green-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;
