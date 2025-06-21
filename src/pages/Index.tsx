import React, { useState, useMemo } from 'react';
import { Leaf, ShoppingCart, Star, TreePine, Recycle, Award } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { SustainabilityScore } from '@/components/SustainabilityScore';
import { SearchBar } from '@/components/SearchBar';
import { ProductQuickView } from '@/components/ProductQuickView';
import { SustainabilityTips } from '@/components/SustainabilityTips';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { InteractiveStats } from '@/components/InteractiveStats';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  sustainabilityScore: number;
  carbonFootprint: number;
  image: string;
  images?: string[]; // Add support for multiple images
  category: string;
  certifications: string[];
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  // Vegetables (Updated with multiple images)
  {
    id: 1,
    name: "Organic Spinach Bundle",
    price: 4.99,
    sustainabilityScore: 9.5,
    carbonFootprint: 0.3,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    ],
    category: "Vegetables",
    certifications: ["Organic", "Local Grown"],
    description: "Fresh organic spinach, locally grown"
  },
  {
    id: 2,
    name: "Heirloom Tomatoes",
    price: 6.99,
    sustainabilityScore: 9.3,
    carbonFootprint: 0.4,
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    ],
    category: "Vegetables",
    certifications: ["Organic", "Heirloom"],
    description: "Colorful heirloom tomatoes, pesticide-free"
  },
  {
    id: 3,
    name: "Rainbow Carrots",
    price: 3.99,
    sustainabilityScore: 9.4,
    carbonFootprint: 0.2,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1522184216316-3c25379f9760?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    ],
    category: "Vegetables",
    certifications: ["Organic", "Non-GMO"],
    description: "Colorful organic carrots, rich in nutrients"
  },
  {
    id: 4,
    name: "Organic Kale Bunch",
    price: 3.49,
    sustainabilityScore: 9.6,
    carbonFootprint: 0.2,
    image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1622197084101-9b2a8d5a2e8b?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    ],
    category: "Vegetables",
    certifications: ["Organic", "Superfood"],
    description: "Nutrient-dense organic kale, perfect for smoothies"
  },

  // Other vegetables with single images for now
  {
    id: 5,
    name: "Sweet Bell Peppers",
    price: 5.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 0.5,
    image: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Vegetables",
    certifications: ["Organic", "Colorful"],
    description: "Mixed color organic bell peppers"
  },
  {
    id: 6,
    name: "Organic Broccoli",
    price: 4.49,
    sustainabilityScore: 9.3,
    carbonFootprint: 0.3,
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Vegetables",
    certifications: ["Organic", "Fresh"],
    description: "Fresh organic broccoli crowns"
  },

  // Fruits (Updated with multiple images)
  {
    id: 7,
    name: "Organic Apple Variety Pack",
    price: 8.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 0.5,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1569870499705-504209102861?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    ],
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
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    ],
    category: "Fruits",
    certifications: ["Organic", "Antioxidant Rich"],
    description: "Mixed organic berries, high in antioxidants"
  },

  // Rest of the products remain the same for brevity
  {
    id: 9,
    name: "Sustainable Bananas",
    price: 4.49,
    sustainabilityScore: 8.7,
    carbonFootprint: 0.7,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Fruits",
    certifications: ["Fair Trade", "Rainforest Alliance"],
    description: "Fair trade bananas from sustainable farms"
  },
  {
    id: 10,
    name: "Organic Oranges",
    price: 6.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 0.6,
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Fruits",
    certifications: ["Organic", "Vitamin C"],
    description: "Juicy organic oranges, vitamin C rich"
  },
  {
    id: 11,
    name: "Organic Avocados",
    price: 9.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 0.8,
    image: "https://images.unsplash.com/photo-1583136647864-9e5c9cceb8f5?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Fruits",
    certifications: ["Organic", "Healthy Fats"],
    description: "Perfectly ripe organic avocados"
  },
  {
    id: 12,
    name: "Organic Strawberries",
    price: 7.99,
    sustainabilityScore: 9.2,
    carbonFootprint: 0.4,
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Fruits",
    certifications: ["Organic", "Sweet"],
    description: "Sweet organic strawberries, pesticide-free"
  },

  // Clothing (Updated with multiple images)
  {
    id: 13,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    sustainabilityScore: 9.2,
    carbonFootprint: 2.1,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4bb5?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    ],
    category: "Clothing",
    certifications: ["Organic", "Fair Trade"],
    description: "100% organic cotton, ethically sourced"
  },

  // Rest of the products
  {
    id: 14,
    name: "Organic Hemp Jeans",
    price: 89.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 3.5,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
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
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Clothing",
    certifications: ["Bamboo Fiber", "Antibacterial"],
    description: "Soft bamboo fiber socks, naturally antibacterial"
  },
  {
    id: 16,
    name: "Recycled Polyester Hoodie",
    price: 54.99,
    sustainabilityScore: 8.6,
    carbonFootprint: 2.8,
    image: "https://images.unsplash.com/photo-1556821840-3a9b358904eb?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Clothing",
    certifications: ["Recycled Material", "Comfortable"],
    description: "Cozy hoodie made from recycled plastic bottles"
  },
  {
    id: 17,
    name: "Sustainable Yoga Pants",
    price: 69.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 2.5,
    image: "https://images.unsplash.com/photo-1506629905877-c4c4ff8fb228?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Clothing",
    certifications: ["Eco-Friendly", "Moisture-Wicking"],
    description: "High-performance yoga pants from sustainable materials"
  },

  // Electronics
  {
    id: 18,
    name: "Solar Power Bank",
    price: 49.99,
    sustainabilityScore: 8.5,
    carbonFootprint: 3.2,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Electronics",
    certifications: ["Solar Powered", "Recyclable"],
    description: "Portable solar-powered charging device"
  },
  {
    id: 19,
    name: "Eco-Friendly Wireless Earbuds",
    price: 79.99,
    sustainabilityScore: 8.2,
    carbonFootprint: 4.1,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Electronics",
    certifications: ["Energy Efficient", "Recyclable"],
    description: "Wireless earbuds made from recycled materials"
  },
  {
    id: 20,
    name: "Sustainable Phone Case",
    price: 34.99,
    sustainabilityScore: 8.9,
    carbonFootprint: 1.8,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Electronics",
    certifications: ["Biodegradable", "Plant-Based"],
    description: "Biodegradable phone case from plant materials"
  },
  {
    id: 21,
    name: "Wind-Up LED Flashlight",
    price: 24.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 1.5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Electronics",
    certifications: ["No Battery", "Durable"],
    description: "Hand-crank LED flashlight, no batteries needed"
  },

  // Home & Garden
  {
    id: 22,
    name: "Bamboo Water Bottle",
    price: 24.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 1.5,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Home & Garden",
    certifications: ["Biodegradable", "BPA-Free"],
    description: "Reusable bamboo fiber water bottle"
  },
  {
    id: 23,
    name: "Recycled Plastic Planters",
    price: 16.99,
    sustainabilityScore: 8.3,
    carbonFootprint: 2.8,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Home & Garden",
    certifications: ["100% Recycled", "UV Resistant"],
    description: "Garden planters made from recycled ocean plastic"
  },
  {
    id: 24,
    name: "Organic Cotton Bedsheets",
    price: 89.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 3.1,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Home & Garden",
    certifications: ["Organic Cotton", "Hypoallergenic"],
    description: "Soft organic cotton bed sheets, chemical-free"
  },
  {
    id: 25,
    name: "LED Solar Garden Lights",
    price: 39.99,
    sustainabilityScore: 8.7,
    carbonFootprint: 2.2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Home & Garden",
    certifications: ["Solar Powered", "Weather Resistant"],
    description: "Eco-friendly solar-powered garden lighting"
  },

  // Personal Care
  {
    id: 26,
    name: "Organic Castile Soap Bar",
    price: 8.99,
    sustainabilityScore: 9.3,
    carbonFootprint: 0.5,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Personal Care",
    certifications: ["Organic", "Palm-Free"],
    description: "Pure organic castile soap, biodegradable"
  },
  {
    id: 27,
    name: "Zero-Waste Shampoo Bar",
    price: 12.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 0.6,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Personal Care",
    certifications: ["Zero Waste", "Sulfate-Free"],
    description: "Solid shampoo bar, plastic-free packaging"
  },
  {
    id: 28,
    name: "Natural Henna Hair Color",
    price: 22.99,
    sustainabilityScore: 9.2,
    carbonFootprint: 1.1,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Personal Care",
    certifications: ["100% Natural", "Chemical-Free"],
    description: "Pure henna hair dye, chemical-free coloring"
  },
  {
    id: 29,
    name: "Bamboo Toothbrush Set",
    price: 15.99,
    sustainabilityScore: 9.4,
    carbonFootprint: 0.4,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Personal Care",
    certifications: ["Biodegradable", "Plastic-Free"],
    description: "Set of 4 bamboo toothbrushes, compostable"
  },

  // Cleaning Products
  {
    id: 30,
    name: "Plant-Based Laundry Pods",
    price: 18.99,
    sustainabilityScore: 8.9,
    carbonFootprint: 1.3,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Cleaning Products",
    certifications: ["Plant-Based", "Biodegradable"],
    description: "Concentrated plant-based laundry detergent pods"
  },
  {
    id: 31,
    name: "Eco All-Purpose Cleaner",
    price: 11.99,
    sustainabilityScore: 8.8,
    carbonFootprint: 0.8,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e857637?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Cleaning Products",
    certifications: ["Non-Toxic", "Biodegradable"],
    description: "Multi-surface cleaner made from natural ingredients"
  },
  {
    id: 32,
    name: "Reusable Paper Towels",
    price: 24.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 1.2,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Cleaning Products",
    certifications: ["Washable", "Zero Waste"],
    description: "Washable and reusable bamboo paper towels"
  },

  // Food & Pantry
  {
    id: 33,
    name: "Organic Quinoa",
    price: 12.99,
    sustainabilityScore: 9.1,
    carbonFootprint: 0.9,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Food & Pantry",
    certifications: ["Organic", "Complete Protein"],
    description: "Premium organic quinoa, complete protein source"
  },
  {
    id: 34,
    name: "Fair Trade Coffee Beans",
    price: 16.99,
    sustainabilityScore: 8.7,
    carbonFootprint: 1.8,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Food & Pantry",
    certifications: ["Fair Trade", "Organic"],
    description: "Ethically sourced organic coffee beans"
  },
  {
    id: 35,
    name: "Sustainable Pasta",
    price: 5.99,
    sustainabilityScore: 8.5,
    carbonFootprint: 0.7,
    image: "https://images.unsplash.com/photo-1551892374-ecf8dd297c8d?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Food & Pantry",
    certifications: ["Organic", "Non-GMO"],
    description: "Organic pasta made from sustainable wheat"
  },

  // Arts & Crafts
  {
    id: 36,
    name: "Natural Beeswax Crayons",
    price: 14.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 0.7,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Arts & Crafts",
    certifications: ["Natural Beeswax", "Non-Toxic"],
    description: "Safe, natural crayons made from pure beeswax"
  },
  {
    id: 37,
    name: "Eco-Friendly Colored Pencils",
    price: 19.99,
    sustainabilityScore: 8.7,
    carbonFootprint: 0.9,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Arts & Crafts",
    certifications: ["FSC Certified", "Non-Toxic"],
    description: "Colored pencils made from sustainable wood"
  },
  {
    id: 38,
    name: "Recycled Paper Notebook",
    price: 15.99,
    sustainabilityScore: 9.0,
    carbonFootprint: 0.8,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Arts & Crafts",
    certifications: ["100% Recycled", "FSC Certified"],
    description: "Made from 100% recycled paper materials"
  },

  // Office Supplies
  {
    id: 39,
    name: "Biodegradable Pens",
    price: 12.99,
    sustainabilityScore: 8.4,
    carbonFootprint: 1.1,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Office Supplies",
    certifications: ["Biodegradable", "Refillable"],
    description: "Eco-friendly pens made from biodegradable materials"
  },
  {
    id: 40,
    name: "Sustainable File Folders",
    price: 18.99,
    sustainabilityScore: 8.6,
    carbonFootprint: 1.0,
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    category: "Office Supplies",
    certifications: ["Recycled Paper", "Durable"],
    description: "File folders made from 100% recycled paper"
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { toast } = useToast();

  const categories = ['All', 'Vegetables', 'Fruits', 'Clothing', 'Electronics', 'Home & Garden', 'Personal Care', 'Cleaning Products', 'Food & Pantry', 'Arts & Crafts', 'Office Supplies'];

  const filteredProducts = useMemo(() => {
    let products = mockProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      products = products.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      products = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.certifications.some(cert => cert.toLowerCase().includes(search))
      );
    }

    return products;
  }, [selectedCategory, searchTerm]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        toast({
          title: "Updated Cart! 🛒",
          description: `${product.name} quantity increased`,
        });
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      toast({
        title: "Added to Cart! 🌱",
        description: `${product.name} added successfully`,
      });
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      toast({
        title: "Removed from Cart",
        description: `${product.name} removed`,
        variant: "destructive",
      });
    }
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

  const totalCarbonSaved = cart.reduce((total, item) => {
    return total + (5 - item.carbonFootprint) * item.quantity;
  }, 0);

  const averageSustainabilityScore = cart.length > 0 
    ? cart.reduce((total, item) => total + item.sustainabilityScore * item.quantity, 0) / cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const handleProductClick = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleQuickViewAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added from Quick View! ⚡",
      description: `${product.name} added to cart`,
    });
  };

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
                className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
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
          
          {/* Interactive Stats */}
          <InteractiveStats
            totalCarbonSaved={totalCarbonSaved}
            totalProducts={mockProducts.length}
            averageSustainability={8.9}
            cartItems={cart.reduce((total, item) => total + item.quantity, 0)}
          />
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search eco-friendly products..."
          />
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
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
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

      {/* Results Info */}
      {(searchTerm || selectedCategory !== 'All') && (
        <section className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-gray-600">
              <p className="animate-fade-in">
                {filteredProducts.length} products found
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Product Recommendations */}
      {cart.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="max-w-7xl mx-auto">
            <ProductRecommendations
              currentProduct={cart[cart.length - 1]}
              allProducts={mockProducts}
              onProductClick={handleProductClick}
            />
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-gray-400 mb-4">
                <Leaf className="h-24 w-24 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or browse different categories</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleProductClick(product)}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Components */}
      <SustainabilityTips />
      
      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleQuickViewAddToCart}
      />

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
