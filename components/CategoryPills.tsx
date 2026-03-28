import React, { CSSProperties } from 'react';
import { CATEGORIES } from '../constants';

interface CategoryGridProps {
    onSelectCategory: (category: string) => void;
    searchQuery: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, searchQuery }) => {
    // Fix: Explicitly type style objects with React.CSSProperties to fix type errors.
    const gridStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '16px',
        padding: '16px',
    };
    
    const itemStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1 / 1',
        borderRadius: '16px',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '8px',
        transition: 'transform 0.2s',
    };
    
    const iconContainerStyle: CSSProperties = {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const nameStyle: CSSProperties = {
        fontSize: '0.875rem',
        fontWeight: '500',
    };
    
    const filteredCategories = CATEGORIES.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={gridStyle}>
            {filteredCategories.map(cat => (
                <div key={cat.name} style={{...itemStyle, backgroundColor: cat.color}} onClick={() => onSelectCategory(cat.name)}>
                    <div style={iconContainerStyle}>{cat.icon}</div>
                    <span style={nameStyle}>{cat.name}</span>
                </div>
            ))}
            {filteredCategories.length === 0 && <p>No categories found.</p>}
        </div>
    );
};