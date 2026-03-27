"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchItems } from '@/store/itemsSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ItemsList({ type, category, userId: propUserId }) {
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
          setUserId(data.user?.id || null);
        }
      } catch (err) {
        console.error('Failed to get session:', err);
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

  if (status === 'loading') return <div className="p-4 text-center">Loading items...</div>;
  if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-3">
      {items.length === 0 && <div className="text-sm text-slate-500 p-4 text-center">No items found.</div>}
      {items.map((it) => (
        <article key={it._id || it.id} className="p-4 rounded-lg border bg-white dark:bg-slate-800 flex items-start gap-4 hover:shadow-md transition">
          <div className="w-20 h-20 rounded-md bg-slate-100 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
            {it.imageUrl ? (
              <img src={it.imageUrl} alt={it.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-2xl">📦</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <strong className="text-slate-900 dark:text-slate-100 truncate">{it.title}</strong>
              <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                {it.type === 'lost' ? '🔴 Lost' : '🟢 Found'}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{it.description || 'No description'}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              <span>📍 {it.location || 'Unknown location'}</span>
              <span>•</span>
              <span>{new Date(it.createdAt).toLocaleDateString()}</span>
            </div>
            {it.userId !== userId && (
              <button
                onClick={() => handleMessageClick(it)}
                disabled={creatingRoom === it._id}
                className="mt-3 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition"
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
