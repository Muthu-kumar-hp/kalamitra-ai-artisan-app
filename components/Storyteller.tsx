import React, { useState } from 'react';
import { Language } from '../types';
import { generateStory } from '../services/geminiService';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Textarea } from './common/Textarea';
import { Select } from './common/Select';
import { Loader } from './common/Loader';
import { ClipboardIcon, SparklesIcon, PencilIcon } from './Icons';

interface StorytellerProps {
  language: Language;
}

const Storyteller: React.FC<StorytellerProps> = ({ language }) => {
  const [storyType, setStoryType] = useState('Product Description');
  const [craftInfo, setCraftInfo] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const storyTypes = ['Product Description', 'Artisan Backstory', 'Blog Post', 'Short Video Script'];
  const timelineEvents = [
    { year: '2010', title: 'The Spark', description: 'Learned the family craft of pottery from my grandmother in a small village in Gujarat.' },
    { year: '2015', title: 'First Exhibition', description: 'Showcased my work for the first time at the local Surajkund Mela, receiving great appreciation.' },
    { year: '2019', title: 'Modern Twist', description: 'Started experimenting with contemporary designs and eco-friendly glazes to appeal to a global audience.' },
    { year: '2024', title: 'Going Digital', description: 'Joined Artisan AI to share my creations and stories with the world.' },
  ];

  const handleGenerate = async () => {
    if (!craftInfo || !productInfo) {
      alert('Please fill in both craft and product information.');
      return;
    }
    setIsLoading(true);
    setGeneratedStory('');
    const result = await generateStory(storyType, language, craftInfo, productInfo);
    setGeneratedStory(result);
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedStory);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Storyteller</h1>
        <p className="text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">
          Weave narratives that captivate your audience and tell the unique story of your craft.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="space-y-6">
            <div>
              <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Content Type</label>
              <Select value={storyType} onChange={(e) => setStoryType(e.target.value)}>
                {storyTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </Select>
            </div>
            <div>
              <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">About Your Craft</label>
              <Textarea 
                value={craftInfo} 
                onChange={(e) => setCraftInfo(e.target.value)}
                placeholder="e.g., I practice the ancient art of block-printing from Rajasthan, using natural dyes..." 
                rows={4}
              />
            </div>
            <div>
              <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">About The Product</label>
              <Textarea 
                value={productInfo} 
                onChange={(e) => setProductInfo(e.target.value)}
                placeholder="e.g., A hand-printed cotton scarf with a peacock motif, measuring 2 meters by 0.5 meters." 
                rows={4}
              />
            </div>
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? <Loader /> : 'Generate Story'}
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
          {generatedStory && !isLoading && (
            <div className="relative">
              <button onClick={handleCopy} className="absolute top-0 right-0 p-2 text-text-secondary hover:text-accent-primary dark:hover:text-indigo-400 ethnic:hover:text-ethnic-primary craftsman:hover:text-craftsman-primary handloom:hover:text-handloom-primary terracotta:hover:text-terracotta-primary tribal:hover:text-tribal-primary madhubani:hover:text-madhubani-primary transition-colors">
                <ClipboardIcon />
              </button>
              <p className="whitespace-pre-wrap text-text-primary bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 p-4 rounded-lg">
                {generatedStory}
              </p>
              {copied && <span className="absolute top-10 right-0 text-sm bg-gray-800 text-white px-2 py-1 rounded">Copied!</span>}
            </div>
          )}
           {!generatedStory && !isLoading && (
            <div className="text-center text-text-secondary py-10">
                <p>Your generated story will appear here.</p>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <PencilIcon className="w-6 h-6 mr-3 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary"/> My Story Corner: An Artisan's Journey
        </h2>
        <div className="relative border-l-2 border-dashed ml-4 border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border">
          {timelineEvents.map((event, index) => (
            <div key={index} className="mb-8 pl-8 relative">
              <div className="absolute -left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-accent-primary dark:bg-indigo-500 ethnic:bg-ethnic-primary craftsman:bg-craftsman-primary handloom:bg-handloom-primary terracotta:bg-terracotta-primary tribal:bg-tribal-primary madhubani:bg-madhubani-primary text-white font-bold text-sm">
                {event.year.substring(2)}
              </div>
              <h4 className="font-bold text-lg text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">{event.title}</h4>
              <p className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">{event.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Storyteller;