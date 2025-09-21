import React from 'react';
import { Language, Page, Theme, Intensity, Pattern } from './types';
import { HomeIcon, PencilIcon, SparklesIcon, ChartBarIcon, BuildingStorefrontIcon, UserCircleIcon, PhotoIcon } from './components/Icons';

export const LANGUAGES: Language[] = ['English', 'Hindi', 'Tamil', 'Bengali', 'Spanish'];

export const PAGES: Page[] = [
    { id: 'dashboard', name: 'Dashboard', icon: <HomeIcon /> },
    { id: 'storyteller', name: 'AI Storyteller', icon: <PencilIcon /> },
    { id: 'marketing', name: 'AI Marketing', icon: <SparklesIcon /> },
    { id: 'trends', name: 'Trend Recommender', icon: <ChartBarIcon /> },
    { id: 'marketplace', name: 'Marketplace Tools', icon: <BuildingStorefrontIcon /> },
    { id: 'showcase', name: 'Product Showcase', icon: <PhotoIcon />},
    { id: 'profile', name: 'My Profile', icon: <UserCircleIcon /> },
];

export const THEMES: Theme[] = [
    Theme.DARK,
    Theme.ETHNIC,
    Theme.CRAFTSMAN,
    Theme.HANDLOOM,
    Theme.TERRACOTTA,
    Theme.TRIBAL,
    Theme.MADHUBANI,
];

export const THEME_CUSTOMIZATIONS: Partial<Record<Theme, { patterns: Pattern[], intensities: Intensity[] }>> = {
    [Theme.ETHNIC]: {
        patterns: ['Lines', 'Waves'],
        intensities: ['Subtle', 'Normal', 'Vibrant'],
    },
    [Theme.HANDLOOM]: {
        patterns: ['Grid', 'Stripes'],
        intensities: ['Subtle', 'Normal', 'Vibrant'],
    },
    [Theme.TRIBAL]: {
        patterns: ['Geometric', 'Dots'],
        intensities: ['Subtle', 'Normal', 'Vibrant'],
    },
    [Theme.MADHUBANI]: {
        patterns: ['Floral', 'Fish'],
        intensities: ['Subtle', 'Normal', 'Vibrant'],
    },
};