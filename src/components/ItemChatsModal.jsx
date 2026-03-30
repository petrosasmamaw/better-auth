"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ItemChatsModal({ isOpen, onClose, itemId, userId, itemTitle }) {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [navigatingRoomId, setNavigatingRoomId] = useState(null);

  useEffect(() => {
    if (isOpen && itemId) {
      fetchChats();
    }
  }, [isOpen, itemId]);

  const fetchChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/rooms/item/${itemId}`, {
        headers: {
          'x-user-id': userId,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch chats');
      const data = await res.json();
      setChats(data || []);
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = async (roomId) => {
    setNavigatingRoomId(roomId);
    try {
      router.push(`/chat/${roomId}`);
    } catch (err) {
      console.error('Error navigating to chat:', err);
      setNavigatingRoomId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Chats for "{itemTitle}"</h2>
            <p className="text-sm text-slate-500 mt-1">
              {chats.length === 0 ? 'No chats yet' : `${chats.length} chat${chats.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin text-3xl">⏳</div>
              <p className="text-slate-500 mt-3">Loading chats...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 font-medium">{error}</p>
              <button
                onClick={fetchChats}
                className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">💬</div>
              <p className="text-slate-500">No chats yet for this item</p>
            </div>
          ) : (
            <div className="space-y-3">
              {chats.map((chat) => {
                // Get the other user (not the item creator)
                const otherUser = chat.participants.find((p) => p !== userId);
                
                return (
                  <button
                    key={chat._id}
                    onClick={() => handleChatClick(chat._id)}
                    disabled={navigatingRoomId === chat._id}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                          <p className="font-semibold text-slate-900 truncate">
                            Chat with: {otherUser || 'Unknown User'}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500">
                          Last updated: {new Date(chat.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className={`text-xl ml-3 transition-transform ${navigatingRoomId === chat._id ? 'animate-spin' : ''}`}>
                        {navigatingRoomId === chat._id ? '⏳' : '→'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
