"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchChatsByItem, clearSelectedItem } from '@/store/chatsSlice';
import { closeChatModal } from '@/store/uiSlice';

export default function ItemChatsModal({ isOpen, itemId, userId, itemTitle }) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux selectors
  const { selectedItemChats, loading, error } = useSelector((s) => s.chats);
  const { chatModalOpen } = useSelector((s) => s.ui);

  // Fetch chats when modal opens
  useEffect(() => {
    if (isOpen && itemId) {
      dispatch(fetchChatsByItem({ itemId, userId }));
    }
  }, [isOpen, itemId, userId, dispatch]);

  const handleChatClick = (roomId) => {
    router.push(`/chat/${roomId}`);
    dispatch(closeChatModal());
  };

  const handleClose = () => {
    dispatch(closeChatModal());
    dispatch(clearSelectedItem());
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
              {selectedItemChats.length === 0 ? 'No chats yet' : `${selectedItemChats.length} chat${selectedItemChats.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={handleClose}
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
                onClick={() => dispatch(fetchChatsByItem({ itemId, userId }))}
                className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : selectedItemChats.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">💬</div>
              <p className="text-slate-500">No chats yet for this item</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedItemChats.map((chat) => {
                const otherUser = chat.participants.find((p) => p !== userId);

                return (
                  <button
                    key={chat._id}
                    onClick={() => handleChatClick(chat._id)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
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
                      <span className="text-xl ml-3">→</span>
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
