import React from 'react';
import { Product } from '../data/products';
import { Button } from './common/Button';
import { ArrowLeftIcon, ShoppingCartIcon } from './Icons';
import { Card } from './common/Card';

interface ProductDetailProps {
    product: Product;
    onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
    return (
        <div className="animate-fade-in">
            <Button variant="secondary" onClick={onBack} className="mb-6 inline-flex items-center group">
              <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Back to Products</span>
            </Button>

            <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="rounded-lg overflow-hidden">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover object-center max-h-[500px]" 
                        />
                    </div>

                    <div className="flex flex-col py-4">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary">
                                {product.category}
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-bold mt-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">
                                {product.name}
                            </h1>
                            <p className="mt-4 text-lg text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">
                                {product.description}
                            </p>
                        </div>
                        
                        <div className="mt-8 flex items-center justify-between">
                            <p className="text-3xl font-extrabold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">
                                ${product.price.toFixed(2)}
                            </p>
                             <Button className="text-lg py-3 px-6" onClick={() => alert(`${product.name} added to cart!`)}>
                                <ShoppingCartIcon className="w-6 h-6 mr-2" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductDetail;
