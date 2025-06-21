
import React, { useState, useEffect } from 'react';
import { Lightbulb, X, Leaf, Recycle, TreePine, Award } from 'lucide-react';

const sustainabilityTips = [
  {
    icon: Leaf,
    title: "Go Organic",
    tip: "Organic products reduce pesticide use by 70% and support biodiversity!",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Recycle,
    title: "Reduce Waste",
    tip: "Choosing reusable products can eliminate up to 500 single-use items per year!",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: TreePine,
    title: "Carbon Footprint",
    tip: "Local products can reduce transportation emissions by up to 80%!",
    color: "from-emerald-400 to-green-500"
  },
  {
    icon: Award,
    title: "Fair Trade",
    tip: "Fair trade products ensure farmers receive 25% more income on average!",
    color: "from-orange-400 to-amber-500"
  }
];

export const SustainabilityTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => {
        setCurrentTip((prev) => (prev + 1) % sustainabilityTips.length);
      }, 100);
    }, 8000);

    // Show first tip after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, []);

  const tip = sustainabilityTips[currentTip];
  const Icon = tip.icon;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
      <div className={`bg-gradient-to-r ${tip.color} text-white p-4 rounded-2xl shadow-2xl max-w-sm hover:scale-105 transition-all duration-300`}>
        <div className="flex items-start space-x-3">
          <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-sm">{tip.title}</h4>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-white/90">{tip.tip}</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-3">
          <Lightbulb className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Sustainability Tip</span>
        </div>
      </div>
    </div>
  );
};
