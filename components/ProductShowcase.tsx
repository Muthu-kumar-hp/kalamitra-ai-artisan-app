import React from 'react';
import { Card } from './common/Card';
import { PRODUCTS, Product } from '../data/products';

interface ProductShowcaseProps {
    onProductSelect: (product: Product) => void;
}

const ProductCard: React.FC<{ product: Product, onProductSelect: (product: Product) => void }> = ({ product, onProductSelect }) => (
    <div 
        onClick={() => onProductSelect(product)}
        className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm">${product.price.toFixed(2)}</p>
        </div>
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
        </div>
    </div>
);

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onProductSelect }) => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Product Showcase</h1>
            <p className="text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80 mb-8">
                A gallery of your beautiful creations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {PRODUCTS.map(product => (
                    <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} />
                ))}
            </div>
        </div>
    );
};

export default ProductShowcase;
