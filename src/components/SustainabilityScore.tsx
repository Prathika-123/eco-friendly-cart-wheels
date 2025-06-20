
import React from 'react';
import { Leaf } from 'lucide-react';

interface SustainabilityScoreProps {
  score: number;
}

export const SustainabilityScore: React.FC<SustainabilityScoreProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    if (score > 0) return 'Fair';
    return 'Start Shopping';
  };

  if (score === 0) {
    return (
      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Leaf className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600 font-medium">Start Shopping</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-green-100">
      <Leaf className={`h-4 w-4 ${getScoreColor(score)}`} />
      <div className="text-sm">
        <span className={`font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
        <span className="text-gray-600 ml-1">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
};
