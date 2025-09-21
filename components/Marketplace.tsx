import React, { useState } from 'react';
import { suggestPrice, editImage } from '../services/geminiService';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { Loader } from './common/Loader';
import { Select } from './common/Select';
import { SparklesIcon, CurrencyDollarIcon, PhotoIcon } from './Icons';
import { PRODUCTS, Product } from '../data/products';

// Helper to convert file to base64
const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
});

interface MarketplaceProps {
    onProductSelect: (product: Product) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onProductSelect }) => {
    // Pricing state
    const [craftType, setCraftType] = useState('');
    const [materialCost, setMaterialCost] = useState('');
    const [hours, setHours] = useState('');
    const [priceSuggestion, setPriceSuggestion] = useState<any>(null);
    const [isPricingLoading, setIsPricingLoading] = useState(false);

    // Image state
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const handlePriceSuggest = async () => {
        setIsPricingLoading(true);
        const result = await suggestPrice(craftType, materialCost, hours);
        setPriceSuggestion(result);
        setIsPricingLoading(false);
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setOriginalImage(file);
            setEditedImage(null);
            setOriginalImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageEdit = async (prompt: string) => {
        if (!originalImage) return;
        setIsEditing(true);
        setEditedImage(null);
        try {
            const base64 = await toBase64(originalImage);
            const result = await editImage(base64, originalImage.type, prompt);
            if (result) {
                setEditedImage(`data:image/png;base64,${result}`);
            }
        } catch (error) {
            console.error("Image editing failed:", error);
            alert("Sorry, there was an error enhancing your image.");
        }
        setIsEditing(false);
    };

    const filteredProducts = PRODUCTS.filter(p => 
        (p.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === 'All' || p.category === categoryFilter)
    );

  return (
    <div className="animate-fade-in space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Marketplace Tools</h1>
        <p className="text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">
          Optimize your listings with AI-powered pricing and photo enhancement.
        </p>
      </div>

      {/* Photo Enhancement */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><PhotoIcon className="w-6 h-6 mr-3 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary"/>AI Photo Enhancer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
                 <label htmlFor="file-upload" className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border hover:border-accent-primary dark:hover:border-indigo-400 ethnic:hover:border-ethnic-primary craftsman:hover:border-craftsman-primary handloom:hover:border-handloom-primary terracotta:hover:border-terracotta-primary tribal:hover:border-tribal-primary madhubani:hover:border-madhubani-primary transition-colors">
                    <PhotoIcon className="w-10 h-10 text-gray-400 mb-2"/>
                    <span className="font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Click to upload image</span>
                    <span className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">PNG, JPG, WEBP</span>
                </label>
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                {originalImage && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="secondary" onClick={() => handleImageEdit('Remove the background, making it transparent.')} disabled={isEditing || !originalImage}>Remove Background</Button>
                        <Button variant="secondary" onClick={() => handleImageEdit('Enhance the lighting and color balance to look professional.')} disabled={isEditing || !originalImage}>Adjust Lighting</Button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 h-64">
                <div className="border border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border rounded-lg p-2 bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50">
                    <h4 className="text-sm font-semibold mb-2 text-center text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Original</h4>
                    {originalImagePreview && <img src={originalImagePreview} alt="Original" className="w-full h-full object-contain"/>}
                </div>
                <div className="border border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border rounded-lg p-2 bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 relative">
                    <h4 className="text-sm font-semibold mb-2 text-center text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Enhanced</h4>
                    {isEditing && <div className="absolute inset-0 flex items-center justify-center"><Loader /></div>}
                    {editedImage && <img src={editedImage} alt="Edited" className="w-full h-full object-contain"/>}
                </div>
            </div>
        </div>
      </Card>
      
      {/* Pricing Assistant */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><CurrencyDollarIcon className="w-6 h-6 mr-3 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary"/>AI Pricing Assistant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <Input label="Craft Type" placeholder="e.g., Pottery, Weaving" value={craftType} onChange={e => setCraftType(e.target.value)} />
                <Input label="Material Cost (USD)" type="number" placeholder="e.g., 15" value={materialCost} onChange={e => setMaterialCost(e.target.value)} />
                <Input label="Hours to Create" type="number" placeholder="e.g., 8" value={hours} onChange={e => setHours(e.target.value)} />
                <Button onClick={handlePriceSuggest} disabled={isPricingLoading}>
                    {isPricingLoading ? <Loader /> : 'Suggest Price'}
                </Button>
            </div>
            <div>
                 {isPricingLoading && <div className="flex justify-center items-center h-full"><Loader /></div>}
                 {priceSuggestion && (
                     <div className="bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 p-6 rounded-lg h-full">
                        <h3 className="font-semibold text-lg mb-4 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Price Recommendation</h3>
                        <div className="flex flex-col sm:flex-row sm:justify-around items-center space-y-4 sm:space-y-0 text-center">
                            <div>
                                <p className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Minimum</p>
                                <p className="text-xl font-bold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">${priceSuggestion.minPrice?.toFixed(2)}</p>
                            </div>
                            <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l sm:border-r py-4 sm:py-0 sm:px-4 border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border">
                                <p className="text-sm font-semibold text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary">Recommended</p>
                                <p className="text-3xl font-bold text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary">${priceSuggestion.recommendedPrice?.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Premium</p>
                                <p className="text-xl font-bold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">${priceSuggestion.premiumPrice?.toFixed(2)}</p>
                            </div>
                        </div>
                        <p className="text-sm italic text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80 mt-4"><strong className="not-italic font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Justification:</strong> {priceSuggestion.justification}</p>
                     </div>
                 )}
            </div>
        </div>
      </Card>

      {/* Product Listing Preview */}
      <Card>
          <h2 className="text-2xl font-semibold mb-4">Product Listing Preview</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input className="flex-grow" placeholder="Search product name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                  <option>All</option>
                  <option>Pottery</option>
                  <option>Textiles</option>
                  <option>Woodwork</option>
                  <option>Painting</option>
                  <option>Decor</option>
                  <option>Jewelry</option>
              </Select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    onClick={() => onProductSelect(product)}
                    className="border border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border rounded-lg p-2 text-center transition-shadow hover:shadow-lg cursor-pointer"
                  >
                      <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                      <h4 className="font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">{product.name}</h4>
                      <p className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">${product.price.toFixed(2)}</p>
                  </div>
              ))}
          </div>
      </Card>
    </div>
  );
};

export default Marketplace;
