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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required className="px-3 py-2 border rounded" />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="px-3 py-2 border rounded">
          <option>General</option>
          <option>Electronics</option>
          <option>Documents</option>
          <option>Clothing</option>
        </select>
      </div>
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="w-full px-3 py-2 border rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" className="px-3 py-2 border rounded" />
        <select value={type} onChange={(e)=>setType(e.target.value)} className="px-3 py-2 border rounded">
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <div>
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-emerald-600 text-white">{loading? 'Saving...':'Create Item'}</button>
      </div>
    </form>
  );
}
