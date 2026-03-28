import React from 'react';

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  summary: string;
  imageUrl: string;
  date: string;
  views?: number;
}

export interface Category {
    name: string;
    // Fix: Use React.ReactNode for JSX elements in .ts files.
    icon: React.ReactNode;
    color: string;
}