import React from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';
import { Card } from './common/Card';
import { ArrowUpIcon, EyeIcon, PlusCircleIcon, SparklesIcon, PencilIcon, ArrowRightIcon } from './Icons';
import { Button } from './common/Button';
import { LineChart, BarChart } from './charts/Charts';

interface DashboardProps {
    setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
    
    const quickActions = [
        { name: 'Add New Product', icon: <PlusCircleIcon />, pageId: 'marketplace' },
        { name: 'Generate Story', icon: <PencilIcon />, pageId: 'storyteller' },
        { name: 'Create Post', icon: <SparklesIcon />, pageId: 'marketing' }
    ];

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text mb-2">Welcome, Artisan!</h1>
                <p className="text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">
                    Here's your business snapshot. Let's grow together.
                </p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Total Sales</p>
                        <p className="text-3xl font-bold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">$1,250</p>
                    </div>
                    <div className="flex items-center text-green-500">
                        <ArrowUpIcon className="w-5 h-5" />
                        <span className="font-semibold ml-1">12%</span>
                    </div>
                </Card>
                 <Card className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Product Views</p>
                        <p className="text-3xl font-bold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">8,430</p>
                    </div>
                    <div className="flex items-center text-green-500">
                        <ArrowUpIcon className="w-5 h-5" />
                        <span className="font-semibold ml-1">8.5%</span>
                    </div>
                </Card>
                 <Card className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">New Orders</p>
                        <p className="text-3xl font-bold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">32</p>
                    </div>
                    <div className="flex items-center text-red-500">
                        <ArrowUpIcon className="w-5 h-5 transform rotate-180" />
                        <span className="font-semibold ml-1">2.1%</span>
                    </div>
                </Card>
                 <Card className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Reach</p>
                        <p className="text-3xl font-bold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">15k</p>
                    </div>
                     <div className="flex items-center text-green-500">
                        <ArrowUpIcon className="w-5 h-5" />
                        <span className="font-semibold ml-1">20%</span>
                    </div>
                </Card>
            </div>

            {/* Charts and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Sales This Month</h3>
                    <div className="h-64 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary">
                       <LineChart />
                    </div>
                </Card>
                <div className="space-y-4">
                     <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Quick Actions</h3>
                     {quickActions.map(action => (
                         <Button key={action.name} variant="secondary" className="w-full justify-start text-lg py-4" onClick={() => setActivePage(PAGES.find(p => p.id === action.pageId)!)}>
                            <span className="w-6 h-6 mr-4">{action.icon}</span>
                            {action.name}
                         </Button>
                     ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <h3 className="text-xl font-semibold mb-4 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Top Products</h3>
                    <ul className="space-y-3 text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">
                       <li className="flex justify-between items-center"><span>Hand-painted Vase</span><span className="font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">15 sales</span></li>
                       <li className="flex justify-between items-center"><span>Woven Silk Scarf</span><span className="font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">12 sales</span></li>
                       <li className="flex justify-between items-center"><span>Wooden Elephant Toy</span><span className="font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">9 sales</span></li>
                       <li className="flex justify-between items-center"><span>Beaded Necklace</span><span className="font-semibold text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">7 sales</span></li>
                    </ul>
                </Card>
                <Card className="lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Social Media Reach</h3>
                    <div className="h-64 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary">
                       <BarChart />
                    </div>
                </Card>
            </div>

             {/* Personalization */}
            <Card>
                <h3 className="text-xl font-semibold mb-4 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Recommended for You</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50">
                        <h4 className="font-bold mb-1 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Market Insight</h4>
                        <p className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Eco-friendly home decor is trending. Try creating a product story around sustainability.</p>
                        <button onClick={() => setActivePage(PAGES.find(p => p.id === 'trends')!)} className="font-bold text-sm mt-2 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary hover:underline">View Trends <ArrowRightIcon className="inline w-4 h-4"/></button>
                    </div>
                    <div className="p-4 rounded-lg bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50">
                        <h4 className="font-bold mb-1 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Marketing Tip</h4>
                        <p className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Create an Instagram Reel showing your creative process. It can increase engagement by 50%.</p>
                        <button onClick={() => setActivePage(PAGES.find(p => p.id === 'marketing')!)} className="font-bold text-sm mt-2 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary hover:underline">Get Reel Idea <ArrowRightIcon className="inline w-4 h-4"/></button>
                    </div>
                     <div className="p-4 rounded-lg bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50">
                        <h4 className="font-bold mb-1 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Photo Tip</h4>
                        <p className="text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Your "Woven Silk Scarf" photo could be improved. Try our AI background removal tool.</p>
                        <button onClick={() => setActivePage(PAGES.find(p => p.id === 'marketplace')!)} className="font-bold text-sm mt-2 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary hover:underline">Enhance Photo <ArrowRightIcon className="inline w-4 h-4"/></button>
                    </div>
                </div>
            </Card>

        </div>
    );
};

export default Dashboard;