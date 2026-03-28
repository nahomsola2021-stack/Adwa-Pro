import React, { CSSProperties } from 'react';

// Fix: Add prop types for Footer component.
interface FooterProps {
    view: string;
    setView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ view, setView }) => {
    // Fix: Explicitly type style objects with React.CSSProperties to fix type errors.
    const footerStyle: CSSProperties = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: '680px',
        margin: '0 auto',
        backgroundColor: 'var(--card-background-color)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        borderTop: '1px solid var(--divider-color)',
        boxShadow: '0 -2px 10px var(--shadow-color)',
        zIndex: 1000,
    };

    const buttonStyle: CSSProperties = {
        background: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        color: 'var(--subtle-text-color)',
        fontSize: '0.75rem',
        padding: '4px 12px',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
    };
    
    const activeButtonStyle: CSSProperties = {
        ...buttonStyle,
        color: 'var(--accent-color)',
        fontWeight: 'bold',
    };
    
    // Fix: Add prop types for NavButton component.
    interface NavButtonProps {
        icon: React.ReactNode;
        label: string;
        targetView: string;
    }
     const NavButton: React.FC<NavButtonProps> = ({ icon, label, targetView }) => {
        const isActive = view === targetView;
        const style = isActive ? activeButtonStyle : buttonStyle;
        return (
            <button style={style} onClick={() => setView(targetView)} aria-pressed={isActive}>
                {icon}
                <span>{label}</span>
            </button>
        );
    };

    return (
        <footer style={footerStyle}>
            <NavButton 
                label="Recent" 
                targetView="home"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>}
            />
             <NavButton 
                label="Category" 
                targetView="categories"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>}
            />
             <NavButton 
                label="Favorite" 
                targetView="favorites"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>}
            />
        </footer>
    );
};