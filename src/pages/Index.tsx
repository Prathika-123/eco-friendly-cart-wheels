
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
  // Original products
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
  // Vegetables
  {
    id: 4,
    name: "Organic Spinach Bundle",
    price: 4.99,
    sustainabilityScore: 9.5,
    carbonFootprint: 0.3,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    category: "Vegetables",
    certifications: ["Organic", "Local Grown"],
    description: "Fresh organic spinach, locally grown"
  },
  {
    id: 5,
    name: "Heirloom Tomatoes",
    price: 6.99,
    sustainabilityScore: 9.3,
    carbonFootprint: 0.4,
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=400&fit=crop",
    category: "Vegetables",
    certifications: ["Organic", "Heirloom"],
    description: "Colorful heirloom tomatoes, pesticide-free"
  },
  {
    id: 6,
    name: "Rainbow Carrots",
    price: 3.99,
    sustainabilityScore: 9.4,
    carbonFootprint: 0.2,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    category: "Vegetables",
    certifications: ["Organic", "Non-GMO"],
    description: "Colorful organic carrots, rich in nutrients"
  },
  // Fruits
  {
    id: 7,
    name: "Organic Apple Variety Pack",
    price: 8.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 0.5,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    category: "Fruits",
    certifications: ["Organic", "Local"],
    description: "Mixed variety of organic apples"
  },
  {
    id: 8,
    name: "Fresh Berries Mix",
    price: 12.99,
    sustainabilityScore: 8.9,
    carbonFootprint: 0.6,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop",
    category: "Fruits",
    certifications: ["Organic", "Antioxidant Rich"],
    description: "Mixed organic berries, high in antioxidants"
  },
  {
    id: 9,
    name: "Sustainable Bananas",
    price: 4.49,
    sustainabilityScore: 8.7,
    carbonFootprint: 0.7,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    category: "Fruits",
    certifications: ["Fair Trade", "Rainforest Alliance"],
    description: "Fair trade bananas from sustainable farms"
  },
  // Electronics
  {
    id: 10,
    name: "Eco-Friendly Wireless Earbuds",
    price: 79.99,
    sustainabilityScore: 8.2,
    carbonFootprint: 4.1,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    category: "Electronics",
    certifications: ["Energy Efficient", "Recyclable"],
    description: "Wireless earbuds made from recycled materials"
  },
  {
    id: 11,
    name: "Sustainable Phone Case",
    price: 34.99,
    sustainabilityScore: 8.9,
    carbonFootprint: 1.8,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    category: "Electronics",
    certifications: ["Biodegradable", "Plant-Based"],
    description: "Biodegradable phone case from plant materials"
  },
  // Books
  {
    id: 12,
    name: "Recycled Paper Notebook",
    price: 15.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 0.8,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    category: "Books",
    certifications: ["100% Recycled", "FSC Certified"],
    description: "Made from 100% recycled paper materials"
  },
  {
    id: 13,
    name: "Eco-Friendly Sketchbook",
    price: 18.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 0.9,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    category: "Books",
    certifications: ["Recycled Paper", "Sustainable"],
    description: "Artist sketchbook made from sustainable materials"
  },
  // Clothing
  {
    id: 14,
    name: "Organic Hemp Jeans",
    price: 89.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 3.5,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Clothing",
    certifications: ["Organic Hemp", "Fair Trade"],
    description: "Durable jeans made from organic hemp fiber"
  },
  {
    id: 15,
    name: "Bamboo Fiber Socks",
    price: 19.99,
    sustainabilityScore: 8.9,
    carbonFootprint: 1.2,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop",
    category: "Clothing",
    certifications: ["Bamboo Fiber", "Antibacterial"],
    description: "Soft bamboo fiber socks, naturally antibacterial"
  },
  // Plastic Items (Eco-friendly alternatives)
  {
    id: 16,
    name: "Biodegradable Food Containers",
    price: 24.99,
    sustainabilityScore: 8.6,
    carbonFootprint: 2.3,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
    category: "Plastic Items",
    certifications: ["Biodegradable", "Compostable"],
    description: "Plant-based food storage containers"
  },
  {
    id: 17,
    name: "Recycled Plastic Planters",
    price: 16.99,
    sustainabilityScore: 8.3,
    carbonFootprint: 2.8,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    category: "Plastic Items",
    certifications: ["100% Recycled", "UV Resistant"],
    description: "Garden planters made from recycled ocean plastic"
  },
  // Hair Colors (Natural/Organic)
  {
    id: 18,
    name: "Natural Henna Hair Color",
    price: 22.99,
    sustainabilityScore: 9.2,
    carbonFootprint: 1.1,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    category: "Hair Colors",
    certifications: ["100% Natural", "Chemical-Free"],
    description: "Pure henna hair dye, chemical-free coloring"
  },
  {
    id: 19,
    name: "Organic Plant-Based Hair Dye Kit",
    price: 28.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 1.4,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop",
    category: "Hair Colors",
    certifications: ["Organic", "Vegan"],
    description: "Complete organic hair coloring kit"
  },
  // Coloring Items
  {
    id: 20,
    name: "Natural Beeswax Crayons",
    price: 14.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 0.7,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
    category: "Coloring Items",
    certifications: ["Natural Beeswax", "Non-Toxic"],
    description: "Safe, natural crayons made from pure beeswax"
  },
  {
    id: 21,
    name: "Eco-Friendly Colored Pencils",
    price: 19.99,
    sustainabilityScore: 8.7,
    carbonFootprint: 0.9,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    category: "Coloring Items",
    certifications: ["FSC Certified", "Non-Toxic"],
    description: "Colored pencils made from sustainable wood"
  },
  // Soaps
  {
    id: 22,
    name: "Organic Castile Soap Bar",
    price: 8.99,
    sustainabilityScore: 9.3,
    carbonFootprint: 0.5,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
    category: "Soaps",
    certifications: ["Organic", "Palm-Free"],
    description: "Pure organic castile soap, biodegradable"
  },
  {
    id: 23,
    name: "Zero-Waste Shampoo Bar",
    price: 12.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 0.6,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    category: "Soaps",
    certifications: ["Zero Waste", "Sulfate-Free"],
    description: "Solid shampoo bar, plastic-free packaging"
  },
  // Detergents
  {
    id: 24,
    name: "Plant-Based Laundry Pods",
    price: 18.99,
    sustainabilityScore: 8.9,
    carbonFootprint: 1.3,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
    category: "Detergents",
    certifications: ["Plant-Based", "Biodegradable"],
    description: "Concentrated plant-based laundry detergent pods"
  },
  {
    id: 25,
    name: "Eco All-Purpose Cleaner",
    price: 11.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 0.8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Detergents",
    certifications: ["Non-Toxic", "Biodegradable"],
    description: "Multi-surface cleaner made from natural ingredients"
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Vegetables', 'Fruits', 'Electronics', 'Books', 'Clothing', 'Plastic Items', 'Hair Colors', 'Coloring Items', 'Soaps', 'Detergents', 'Lifestyle'];

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
              <div className="text-2xl font-bold text-gray-900">8.9</div>
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
