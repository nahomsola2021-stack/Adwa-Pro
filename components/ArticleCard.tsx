import React, { CSSProperties } from 'react';
import { Article } from '../types';
import { EyeIcon } from '../constants';

interface ArticleCardProps {
    article: Article;
    onSelectArticle: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelectArticle }) => {
    // Fix: Explicitly type style objects with React.CSSProperties to fix type errors.
     const cardStyle: CSSProperties = {
        backgroundColor: 'var(--card-background-color)',
        borderRadius: '12px',
        margin: '16px',
        boxShadow: '0 1px 3px var(--shadow-color)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
    };

    const imageStyle: CSSProperties = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        display: 'block',
    };
    
    const contentStyle: CSSProperties = {
        padding: '16px',
    };

    const titleStyle: CSSProperties = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        margin: '0 0 8px 0',
        lineHeight: '1.3',
    };
    
    const summaryStyle: CSSProperties = {
        fontSize: '1rem',
        color: 'var(--subtle-text-color)',
        margin: '0',
        lineHeight: '1.5',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };
    
    const metaStyle: CSSProperties = {
        marginTop: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--subtle-text-color)',
        fontSize: '0.875rem'
    };

    return (
        <div style={cardStyle} onClick={() => onSelectArticle(article.id)} role="article">
            <img src={article.imageUrl} alt={article.title} style={imageStyle} loading="lazy" />
            <div style={contentStyle}>
                <h2 style={titleStyle}>{article.title}</h2>
                <p style={summaryStyle}>{article.summary}</p>
                <div style={metaStyle}>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span><EyeIcon /> {article.views || 0}</span>
                </div>
            </div>
        </div>
    );
};