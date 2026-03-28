import React, { useState, useRef, CSSProperties } from 'react';
import { CATEGORIES } from '../constants';
import { Article } from '../types';

interface AdminPanelProps {
    onAddArticle: (newArticleData: Omit<Article, 'id' | 'date' | 'imageUrl' | 'views'>, imageFile: File) => Promise<void>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddArticle }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0].name);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [summary, setSummary] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !imageFile || !summary) {
            alert('Please fill all fields, upload an image, and provide a summary.');
            return;
        }
        setIsPosting(true);
        try {
            await onAddArticle({ title, content, category, summary }, imageFile);
            setTitle('');
            setContent('');
            setCategory(CATEGORIES[0].name);
            setImageFile(null);
            setSummary('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            alert('Article posted successfully!');
        } catch (error) {
            console.error("Failed to post article:", error);
            alert(`Error posting article: ${(error as Error).message}`);
        }
        setIsPosting(false);
    };

    // Styles
    const panelStyle: CSSProperties = { padding: '16px' };
    const formStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' };
    const inputStyle: CSSProperties = { padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid var(--divider-color)' };
    const textareaStyle: CSSProperties = { ...inputStyle, minHeight: '120px', resize: 'vertical' };
    const buttonStyle: CSSProperties = { padding: '12px', fontSize: '1rem', fontWeight: 'bold', color: 'white', backgroundColor: 'var(--accent-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', opacity: isPosting ? 0.7 : 1 };

    return (
        <div style={panelStyle}>
            <h2>Post News</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} required/>
                <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} style={textareaStyle} required/>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} required>
                   {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                </select>
                <input type="file" accept="image/*" onChange={handleImageChange} style={inputStyle} ref={fileInputRef} required />
                <textarea placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} style={textareaStyle} required/>
                <button type="submit" disabled={isPosting} style={buttonStyle}>
                    {isPosting ? 'Posting...' : 'Post Article'}
                </button>
            </form>
        </div>
    );
};
