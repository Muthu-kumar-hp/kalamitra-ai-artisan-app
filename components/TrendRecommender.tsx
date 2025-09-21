import React, { useState, useEffect, useCallback } from 'react';
import { getMarketTrends } from '../services/geminiService';
import { Card } from './common/Card';
import { Loader } from './common/Loader';
import { Button } from './common/Button';
import { TagIcon, ColorSwatchIcon, TrendingUpIcon } from './Icons';

interface Trends {
  productCategories: string[];
  colorPalette: string[];
  demandForecast: string;
}

const TrendRecommender: React.FC = () => {
  const [trends, setTrends] = useState<Trends | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrends = useCallback(async () => {
    setIsLoading(true);
    const result = await getMarketTrends();
    setTrends(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTrends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold mb-2">Trend Recommender</h1>
            <p className="text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">
              Stay ahead of the curve with AI-powered market insights.
            </p>
        </div>
        <Button onClick={fetchTrends} disabled={isLoading} variant="secondary">
          {isLoading ? <Loader /> : 'Refresh Trends'}
        </Button>
      </div>

      {isLoading && <div className="flex justify-center mt-16"><Loader size="lg" /></div>}
      
      {!isLoading && trends && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
                <div className="flex items-center mb-4">
                    <TagIcon className="w-6 h-6 mr-3 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary" />
                    <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Trending Categories</h3>
                </div>
                <ul className="space-y-2 list-disc list-inside text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">
                    {trends.productCategories.map((cat, i) => <li key={i}>{cat}</li>)}
                </ul>
            </Card>
            <Card>
                <div className="flex items-center mb-4">
                    <ColorSwatchIcon className="w-6 h-6 mr-3 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary" />
                    <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Seasonal Color Palette</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {trends.colorPalette.map((color, i) => (
                        <span key={i} className="bg-bg-secondary dark:bg-gray-700 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 text-text-primary dark:text-gray-200 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text font-medium px-3 py-1 rounded-full">{color}</span>
                    ))}
                </div>
            </Card>
            <Card>
                <div className="flex items-center mb-4">
                    <TrendingUpIcon className="w-6 h-6 mr-3 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary" />
                    <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Demand Forecast</h3>
                </div>
                <p className="text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">{trends.demandForecast}</p>
            </Card>
        </div>
      )}
    </div>
  );
};

export default TrendRecommender;