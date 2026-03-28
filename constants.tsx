import React from 'react';
import { Category } from './types';

const EducationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M4 6h16v2H4zm0 4h16v2H4zm0 4h10v2H4zm14.1-3.5.7-1 4.2 3-4.2 3-.7-1 2.8-2-2.8-2zM4 18h16v2H4zM2 4h20v16H2V4zm2 2v12h16V6H4z"/>
    </svg>
);
const BusinessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm5-10.5c.83 0 1.5-.67 1.5-1.5S17.83 2 17 2s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-1.85 4.35 1.41 1.41L19.5 5.83V9h2V3h-6v2h3.17l-3.02 3.02zm-7.3 0 1.41-1.41L12.17 6H9V4h6v2h-3.17l-3.02 3.02zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4v-1.1c.22-.63 2.19-1.9 6-1.9s5.78 1.27 6 1.9V18H6z"/>
    </svg>
);
const AIPromptIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
);
const TechnologyIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M7 2v2H3v16h18V4h-4V2H7zm-2 4h14v12H5V6zm2 2v2h2V8H7zm4 0v2h2V8h-2zm4 0v2h2V8h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/>
    </svg>
);
const AutomotiveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
);
const PhotographyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M21 5h-3.17L16 3H8L6.17 5H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        <circle cx="12" cy="13" r="3"/>
    </svg>
);
const SportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M3.5 20.5c-1.11 0-2-.9-2-2s.89-2 2-2c1.1 0 2 .9 2 2s-.9 2-2 2zm17-15c-1.11 0-2-.9-2-2s.89-2 2-2c1.1 0 2 .9 2 2s-.9 2-2 2zM13 2c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zm-3.23 8.35c.34-.17.59-.49.65-.87.12-.76-.39-1.48-1.15-1.61-.76-.12-1.48.39-1.61 1.15-.12.76.39 1.48 1.15 1.61.34.06.67.02.96-.18zM6.35 8.77l-1.41-1.41-1.41 1.41L2.12 7.35l1.41-1.41 1.41 1.41 1.41-1.41 1.41 1.41-1.41 1.41 1.41 1.41zM19.07 15l1.41-1.41-1.41-1.41 1.41-1.41-1.41-1.41-1.41 1.41-1.41-1.41-1.41 1.41 1.41 1.41 1.41 1.41z"/>
    </svg>
);
const BeautyIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/>
    </svg>
);
const SocialIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

export const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 13c-3.79 0-7.17-2.13-8.82-5.5C4.83 8.63 8.21 6.5 12 6.5s7.17 2.13 8.82 5.5c-1.65 3.37-5.03 5.5-8.82 5.5z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

export const CATEGORIES: Category[] = [
  { name: 'Education', icon: <EducationIcon />, color: '#4A148C' },
  { name: 'Business', icon: <BusinessIcon />, color: '#D32F2F' },
  { name: 'AI Prompt', icon: <AIPromptIcon />, color: '#4CAF50' },
  { name: 'Technology', icon: <TechnologyIcon />, color: '#388E3C' },
  { name: 'Automotive', icon: <AutomotiveIcon />, color: '#7B1FA2' },
  { name: 'Photography', icon: <PhotographyIcon />, color: '#1976D2' },
  { name: 'Sport', icon: <SportIcon />, color: '#004D40' },
  { name: 'Beauty', icon: <BeautyIcon />, color: '#F57C00' },
  { name: 'Social', icon: <SocialIcon />, color: '#00796B' },
];
