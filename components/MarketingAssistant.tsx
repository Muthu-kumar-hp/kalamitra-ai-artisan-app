import React, { useState } from 'react';
import { Language } from '../types';
import { generateMarketingContent } from '../services/geminiService';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Textarea } from './common/Textarea';
import { Select } from './common/Select';
import { Loader } from './common/Loader';

interface MarketingAssistantProps {
  language: Language;
}

const MarketingAssistant: React.FC<MarketingAssistantProps> = ({ language }) => {
  const [platform, setPlatform] = useState('Instagram Post');
  const [promotion, setPromotion] = useState('General Promotion');
  const [productInfo, setProductInfo] = useState('');
  const [generatedContent, setGeneratedContent] = useState<{postCopy: string; hashtags: string[]; keywords: string[]} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const platforms = ['Instagram Post', 'Instagram Reel Idea', 'Facebook Ad Copy', 'Email Newsletter Snippet'];
  const promotions = ['General Promotion', 'Diwali Sale', 'Holi Collection', 'Christmas Special', 'New Arrival'];

  const handleGenerate = async () => {
    if (!productInfo) {
      alert('Please describe your product.');
      return;
    }
    setIsLoading(true);
    setGeneratedContent(null);
    const result = await generateMarketingContent(platform, promotion, language, productInfo);
    setGeneratedContent(result);
    setIsLoading(false);
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">AI Marketing Assistant</h1>
      <p className="text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80 mb-8">
        Create professional marketing content to boost your online presence effortlessly.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Platform</label>
                <Select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </Select>
              </div>
              <div>
                <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Promotion Type</label>
                <Select value={promotion} onChange={(e) => setPromotion(e.target.value)}>
                  {promotions.map(p => <option key={p} value={p}>{p}</option>)}
                </Select>
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Product Information</label>
              <Textarea 
                value={productInfo} 
                onChange={(e) => setProductInfo(e.target.value)}
                placeholder="e.g., Hand-carved wooden elephant statue, 6 inches tall, made from sustainable mango wood."
                rows={5}
              />
            </div>
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? <Loader /> : 'Generate Content'}
            </Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Generated Content</h3>
           {isLoading && (
            <div className="flex items-center justify-center h-full">
                <Loader />
            </div>
          )}
          {generatedContent && !isLoading && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Post Copy</h4>
                <p className="whitespace-pre-wrap bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 p-4 rounded-lg text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">{generatedContent.postCopy}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.hashtags.map((tag, i) => (
                    <span key={i} className="text-sm font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-indigo-900 dark:text-indigo-300 ethnic:bg-ethnic-primary/20 ethnic:text-ethnic-primary craftsman:bg-craftsman-primary/20 craftsman:text-craftsman-primary handloom:bg-handloom-primary/20 handloom:text-handloom-text terracotta:bg-terracotta-primary/20 terracotta:text-terracotta-text tribal:bg-tribal-primary/20 tribal:text-tribal-primary madhubani:bg-madhubani-primary/20 madhubani:text-madhubani-text">{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.keywords.map((word, i) => (
                    <span key={i} className="text-sm font-medium px-2.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-teal-900 dark:text-teal-300 ethnic:bg-orange-200 ethnic:text-orange-900 craftsman:bg-teal-900 craftsman:text-teal-300 handloom:bg-gray-300 handloom:text-gray-800 terracotta:bg-red-200 terracotta:text-red-900 tribal:bg-red-900 tribal:text-red-300 madhubani:bg-yellow-200 madhubani:text-yellow-900">{word}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {!generatedContent && !isLoading && (
            <div className="text-center text-text-secondary py-10">
                <p>Your generated marketing content will appear here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MarketingAssistant;