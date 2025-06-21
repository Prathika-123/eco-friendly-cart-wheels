
import React, { useState, useEffect } from 'react';
import { TreePine, Leaf, Award, TrendingUp } from 'lucide-react';

interface InteractiveStatsProps {
  totalCarbonSaved: number;
  totalProducts: number;
  averageSustainability: number;
  cartItems: number;
}

export const InteractiveStats: React.FC<InteractiveStatsProps> = ({
  totalCarbonSaved,
  totalProducts,
  averageSustainability,
  cartItems,
}) => {
  const [animatedCarbonSaved, setAnimatedCarbonSaved] = useState(0);
  const [animatedSustainability, setAnimatedSustainability] = useState(0);

  useEffect(() => {
    const carbonInterval = setInterval(() => {
      setAnimatedCarbonSaved(prev => {
        const next = prev + totalCarbonSaved / 20;
        return next >= totalCarbonSaved ? totalCarbonSaved : next;
      });
    }, 50);

    const sustainabilityInterval = setInterval(() => {
      setAnimatedSustainability(prev => {
        const next = prev + averageSustainability / 20;
        return next >= averageSustainability ? averageSustainability : next;
      });
    }, 50);

    return () => {
      clearInterval(carbonInterval);
      clearInterval(sustainabilityInterval);
    };
  }, [totalCarbonSaved, averageSustainability]);

  const stats = [
    {
      icon: TreePine,
      value: animatedCarbonSaved.toFixed(1),
      unit: 'kg CO₂ Saved',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700'
    },
    {
      icon: Leaf,
      value: totalProducts.toString(),
      unit: 'Eco Products',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-700'
    },
    {
      icon: Award,
      value: animatedSustainability.toFixed(1),
      unit: 'Avg Sustainability',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-700'
    },
    {
      icon: TrendingUp,
      value: cartItems.toString(),
      unit: 'Items in Cart',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-100',
      textColor: 'text-cyan-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-2xl p-6 border border-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer group`}
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.unit}</div>
          </div>
        );
      })}
    </div>
  );
};
