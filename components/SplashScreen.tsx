import React from 'react';

export const SplashScreen = () => {
    const style: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        fontSize: '2rem',
        fontWeight: 'bold',
        flexDirection: 'column',
        gap: '16px',
    };
    return (
        <div style={style}>
            <img src="/logo.png" alt="Adwa Pro Logo" style={{ width: '120px', height: '120px' }} />
            <span>Adwa Pro</span>
        </div>
    );
};
