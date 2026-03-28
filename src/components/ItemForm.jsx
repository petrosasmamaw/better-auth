"use client";
import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/authClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ItemForm({ defaultType = 'lost', onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [location, setLocation] = useState('');
  const [type, setType] = useState(defaultType);
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const session = await authClient.getSession();
        if (mounted && session?.user?.id) setUserId(session.user.id);
        else {
          // fallback: try the auth API route (server-side session) — helps when client lib returns null
          try {
            const r = await fetch('/api/auth/get-session');
            if (r.ok) {
              const js = await r.json();
              if (mounted && js?.user?.id) setUserId(js.user.id);
            }
          } catch (e) {
            // ignore fallback failures
          }
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('description', description);
      fd.append('category', category);
      fd.append('location', location);
      fd.append('type', type);
      if (file) fd.append('file', file);
      if (userId) fd.append('userId', userId);

      const headers = {};
      if (userId) headers['x-user-id'] = userId;
      const res = await fetch(`${API_URL}/api/items`, { method: 'POST', body: fd, headers });
      if (!res.ok) throw new Error('Failed to create item');
      const data = await res.json();
      setTitle(''); setDescription(''); setFile(null);
      if (onCreated) onCreated(data);
    } catch (err) {
      setError(err.message || 'Error');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-900">Item Title</label>
        <input 
          value={title} 
          onChange={(e)=>setTitle(e.target.value)} 
          placeholder="e.g., Blue backpack" 
          required 
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50 text-slate-900 placeholder-slate-400" 
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-900">Category</label>
          <select 
            value={category} 
            onChange={(e)=>setCategory(e.target.value)} 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50 text-slate-900"
          >
            <option>General</option>
            <option>Electronics</option>
            <option>Documents</option>
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-900">Status</label>
          <div className="flex gap-2 h-12">
            <button
              type="button"
              onClick={() => setType('lost')}
              className={`flex-1 rounded-xl font-medium transition-all duration-200 ${
                type === 'lost'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Lost
            </button>
            <button
              type="button"
              onClick={() => setType('found')}
              className={`flex-1 rounded-xl font-medium transition-all duration-200 ${
                type === 'found'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Found
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-900">Description</label>
        <textarea 
          value={description} 
          onChange={(e)=>setDescription(e.target.value)} 
          placeholder="Describe the item details..." 
          rows="3"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50 text-slate-900 placeholder-slate-400 resize-none" 
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-900">Location</label>
        <input 
          value={location} 
          onChange={(e)=>setLocation(e.target.value)} 
          placeholder="Where did you see it?" 
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50 text-slate-900 placeholder-slate-400" 
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-900">Image</label>
        <div className="relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e)=>setFile(e.target.files?.[0]||null)}
            className="hidden"
            id="file-input"
          />
          <label 
            htmlFor="file-input"
            className="block w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition text-slate-600 font-medium"
          >
            {file ? `✓ ${file.name}` : '📷 Click to upload or drag image'}
          </label>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        {loading ? '⏳ Saving...' : '✨ Create Item'}
      </button>
    </form>
  );
}
