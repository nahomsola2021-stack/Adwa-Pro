import React from 'react';
import { Article } from '../types';
import { EyeIcon } from '../constants';

interface ArticleDetailProps {
    article: Article;
    onBack: () => void;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    isAdmin: boolean;
    onDeleteArticle: (id: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack, isFavorite, onToggleFavorite, isAdmin, onDeleteArticle }) => {
    const detailStyle = {
        padding: '16px',
        backgroundColor: 'var(--card-background-color)',
        minHeight: '100vh',
    };
    
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
    };

    const backButtonStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        marginRight: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    
    const imageStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: '12px',
        marginBottom: '16px',
    };
    
    const titleStyle = {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        margin: '0 0 8px 0',
        lineHeight: 1.2,
    };
    
    const metaStyle = {
        color: 'var(--subtle-text-color)',
        fontSize: '0.875rem',
        marginBottom: '16px'
    };

    const contentStyle = {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
    };
    
    const favoriteButtonStyle = {
        ...backButtonStyle,
        marginLeft: 'auto',
    };
    
    const deleteButtonStyle = {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'var(--delete-button-text)',
        backgroundColor: 'var(--delete-button-bg)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '24px',
    };

    return (
        <div style={detailStyle}>
            <div style={headerStyle}>
                <button style={backButtonStyle} onClick={onBack} aria-label="Go back">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <button style={favoriteButtonStyle} onClick={() => onToggleFavorite(article.id)} aria-label="Toggle favorite">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
            <img src={article.imageUrl} alt={article.title} style={imageStyle}/>
            <h1 style={titleStyle}>{article.title}</h1>
            <p style={metaStyle}>
                {new Date(article.date).toLocaleDateString()} &bull; <EyeIcon /> {article.views || 0} views
            </p>
            <p style={contentStyle}>{article.content}</p>
            {isAdmin && (
                <button style={deleteButtonStyle} onClick={() => onDeleteArticle(article.id)}>
                    Delete Post
                </button>
            )}
        </div>
    );
};
