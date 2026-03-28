import React, { useRef, CSSProperties } from 'react';

// Fix: Add prop types for SearchBar component.
interface SearchBarProps {
    searchQuery: string;
    onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const SearchBar = React.memo<SearchBarProps>(({ searchQuery, onSearchQueryChange, placeholder }) => {
    const searchInputStyle: CSSProperties = {
        width: '100%',
        padding: '12px 16px 12px 40px',
        border: 'none',
        borderRadius: '999px',
        backgroundColor: '#e4e6eb',
        fontSize: '1rem',
        color: 'var(--text-color)',
        outline: 'none',
    };
    const searchContainerStyle: CSSProperties = {
        position: 'relative',
        flexGrow: 1,
    };
    const searchIconStyle: CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '16px',
        transform: 'translateY(-50%)',
        color: 'var(--subtle-text-color)',
        pointerEvents: 'none',
    };

    return (
        <div style={searchContainerStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={searchIconStyle}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
                type="search"
                placeholder={placeholder}
                value={searchQuery}
                onChange={onSearchQueryChange}
                style={searchInputStyle}
                aria-label="Search"
            />
        </div>
    );
});

interface HeaderProps {
    view: string;
    onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string;
    toggleAdminView: () => void;
}

export const Header = React.memo<HeaderProps>(({ view, onSearchQueryChange, searchQuery, toggleAdminView }) => {
    const longPressTimeout = useRef<number | null>(null);
    
    const handleMouseDown = () => {
        longPressTimeout.current = window.setTimeout(() => {
            toggleAdminView();
        }, 1000);
    };

    const handleMouseUp = () => {
        if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
        }
    };
    
    const headerStyle: CSSProperties = {
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--background-color)',
        padding: '12px 16px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid var(--divider-color)',
    };
    
    const logoStyle: CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    if (view === 'categories') {
        return (
            <header style={{ ...headerStyle, flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ width: '36px' }}></div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', flexGrow: 1 }}>Category</h1>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#1877f2',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}>A</div>
                </div>
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchQueryChange={onSearchQueryChange}
                    placeholder="Search categories..."
                />
            </header>
        );
    }

    return (
        <header style={headerStyle}>
            <h1 
                style={logoStyle} 
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp} 
                onTouchStart={handleMouseDown} 
                onTouchEnd={handleMouseUp}
            >
                <img src="/logo.png" alt="Adwa Pro Logo" style={{ height: '32px' }} />
                Adwa Pro
            </h1>
            <SearchBar
                searchQuery={searchQuery}
                onSearchQueryChange={onSearchQueryChange}
                placeholder="Search articles..."
            />
        </header>
    );
});
