"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchItems } from '@/store/itemsSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ItemsList({ type, category, userId: propUserId, gridLayout = false }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, status, error } = useSelector((s) => s.items || { items: [], status: 'idle' });
  const [userId, setUserId] = useState(null);
  const [creatingRoom, setCreatingRoom] = useState(null);

  // Get current user ID (if not provided from server)
  useEffect(() => {
    if (propUserId) {
      setUserId(propUserId);
      return;
    }
    
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/auth/get-session');
        if (res.ok && mounted) {
          const data = await res.json();
          setUserId(data?.user?.id || null);
        }
      } catch (err) {
        console.error('Failed to get session:', err);
        if (mounted) setUserId(null);
      }
    })();
    return () => { mounted = false; };
  }, [propUserId]);

  // Fetch items when filters or userId change
  useEffect(() => {
    const params = { type, category };
    
    // For dashboard "My Items", filter by userId
    if (!type && !category && userId) {
      params.userId = userId;
    }
    
    // Remove undefined values
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    
    if (Object.keys(params).length > 0 || (type || category)) {
      dispatch(fetchItems(params));
    }
  }, [dispatch, type, category, userId]);

  const handleMessageClick = async (item) => {
    if (!userId) {
      alert('Please log in to message');
      return;
    }

    if (item.userId === userId) {
      alert('You cannot message yourself');
      return;
    }

    setCreatingRoom(item._id);
    try {
      const res = await fetch(`${API_URL}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          itemId: item._id,
          interestedUserId: userId,
        }),
      });

      if (!res.ok) throw new Error('Failed to create room');
      const room = await res.json();
      router.push(`/chat/${room._id}`);
    } catch (err) {
      console.error('Error creating room:', err);
      alert('Failed to create chat room: ' + err.message);
    } finally {
      setCreatingRoom(null);
    }
  };

  if (status === 'loading') return <div className="p-8 text-center text-slate-400"><div className="inline-block animate-spin">⏳</div> Loading items...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-medium">Error: {error}</div>;

  const containerClass = gridLayout 
    ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
    : "space-y-4";

  return (
    <div className={containerClass}>
      {items.length === 0 && <div className="text-center p-12 text-slate-400 text-sm col-span-full">No items found yet.</div>}
      {items.map((it) => (
        <article key={it._id || it.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex items-start gap-6">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
            {it.imageUrl ? (
              <img src={it.imageUrl} alt={it.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-5xl">📦</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 truncate">{it.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{it.category || 'General'}</p>
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap flex-shrink-0 ${
                it.type === 'lost' 
                  ? 'bg-rose-100 text-rose-700' 
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {it.type === 'lost' ? '● Lost' : '● Found'}
              </span>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">{it.description || 'No description'}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
              <span className="flex items-center gap-1">📍 {it.location || 'Unknown location'}</span>
              <span className="text-slate-300">•</span>
              <span>{new Date(it.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            {it.userId !== userId && (
              <button
                onClick={() => handleMessageClick(it)}
                disabled={creatingRoom === it._id}
                className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white transition-colors duration-200"
              >
                {creatingRoom === it._id ? 'Opening chat...' : 'Message'}
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
