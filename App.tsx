import React, { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, runTransaction } from "firebase/firestore";
import { db, firebaseError } from './services/firebase';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Article } from './types';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { AdminPanel } from './components/AdminPanel';
import { CategoryGrid } from './components/CategoryPills';

export const App = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
    const [view, setView] = useState('home'); // home, categories, favorites, admin
    const [isAdmin, setIsAdmin] = useState(false);
    const [favoriteArticleIds, setFavoriteArticleIds] = useLocalStorage('favoriteArticles', []);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    
    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // ✅ Real-time Firestore listener
    useEffect(() => {
        if (firebaseError) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsubscribe = onSnapshot(
            collection(db, "articles"),
            (snapshot) => {
                const articlesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
                articlesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setArticles(articlesData);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching articles: ", error);
                setLoading(false);
            }
        );

        return () => unsubscribe(); // Clean up listener
    }, []);

    // ✅ Count view (with sessionStorage to prevent duplicate counts per session)
    const handleSelectArticle = useCallback(async (articleId: string) => {
        setSelectedArticleId(articleId);

        const viewedKey = `viewed_${articleId}`;
        if (sessionStorage.getItem(viewedKey)) {
            return; // Skip if already viewed this session
        }
        sessionStorage.setItem(viewedKey, "true");

        try {
            const articleRef = doc(db, "articles", articleId);
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(articleRef);
                if (!sfDoc.exists()) {
                    throw new Error("Document does not exist!");
                }
                const newViews = (sfDoc.data().views || 0) + 1;
                transaction.update(articleRef, { views: newViews });
            });
            setArticles(prev => prev.map(a => a.id === articleId ? { ...a, views: (a.views || 0) + 1 } : a));
        } catch (e) {
            console.error("View count transaction failed: ", e);
        }
    }, []);

    // ✅ Add new article
    const handleAddArticle = useCallback(async (newArticleData: Omit<Article, 'id' | 'date' | 'imageUrl' | 'views'>, imageFile: File) => {
        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1ohipim/image/upload";
        const CLOUDINARY_UPLOAD_PRESET = "car_images";
        
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const uploadResponse = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
        if (!uploadResponse.ok) throw new Error('Image upload to Cloudinary failed.');
        const imageData = await uploadResponse.json();
        
        const id = new Date().toISOString() + '-' + Math.random().toString(36).substring(2,9);
        const articleWithAllData: Article = {
            ...newArticleData,
            id,
            date: new Date().toISOString(),
            imageUrl: imageData.secure_url,
            views: 0
        };
        
        await setDoc(doc(db, "articles", id), articleWithAllData);
        setView('home');
    }, []);
    
    // ✅ Delete article
    const handleDeleteArticle = useCallback(async (articleId: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        await deleteDoc(doc(db, "articles", articleId));
        setSelectedArticleId(null);
    }, []);

    // ✅ Favorite toggle
    const handleToggleFavorite = useCallback((articleId: string) => {
        setFavoriteArticleIds(prev =>
            prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
        );
    }, [setFavoriteArticleIds]);

    // ✅ Admin mode toggle with button
    const toggleAdminView = useCallback(() => {
        setIsAdmin(prev => !prev);
        setView(prev => prev === 'admin' ? 'home' : 'admin');
    }, []);

    const selectedArticle = articles.find(a => a.id === selectedArticleId);
    const favoriteArticles = articles.filter(a => favoriteArticleIds.includes(a.id));
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    if (loading) {
        return <SplashScreen />;
    }

    if (firebaseError) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                <h1>Application Error</h1>
                <p>Could not connect to the database. Please check your Firebase configuration and internet connection.</p>
                <p><strong>Details:</strong> {(firebaseError as Error).message}</p>
            </div>
        );
    }

    if (selectedArticle) {
        return (
            <ArticleDetail 
                article={selectedArticle} 
                onBack={() => setSelectedArticleId(null)}
                isFavorite={favoriteArticleIds.includes(selectedArticle.id)}
                onToggleFavorite={handleToggleFavorite}
                isAdmin={isAdmin}
                onDeleteArticle={handleDeleteArticle}
            />
        );
    }

    return (
        <div>
            <Header 
                view={view} 
                searchQuery={searchQuery}
                onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
                toggleAdminView={toggleAdminView} 
            />
            {isAdmin && (
                <div style={{
                    backgroundColor: 'var(--admin-banner-bg)',
                    border: `1px solid var(--admin-banner-border)`,
                    padding: '8px 16px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    Admin Mode 
                    <button
                        onClick={toggleAdminView}
                        style={{
                            marginLeft: '10px',
                            padding: '6px 12px',
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Exit Admin
                    </button>
                </div>
            )}
            <main>
               {view === 'home' && filteredArticles.map(article => (
                   <ArticleCard key={article.id} article={article} onSelectArticle={handleSelectArticle} />
               ))}
               {view === 'favorites' && favoriteArticles.map(article => (
                   <ArticleCard key={article.id} article={article} onSelectArticle={handleSelectArticle} />
               ))}
               {view === 'admin' && <AdminPanel onAddArticle={handleAddArticle} />}
               {view === 'categories' && (
                   <CategoryGrid
                       onSelectCategory={(cat) => { setSearchQuery(cat); setView('home'); }}
                       searchQuery={debouncedSearchQuery}
                   />
               )}
            </main>
            <Footer view={view} setView={setView} />
        </div>
    );
};
