"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authClient } from '@/lib/authClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch session and messages
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Get current user ID from auth
        const session = await authClient.getSession();
        if (mounted && session?.user?.id) {
          setUserId(session.user.id);
        } else {
          // Fallback to server-side session
          try {
            const r = await fetch('/api/auth/get-session');
            if (r.ok) {
              const js = await r.json();
              if (mounted && js?.user?.id) setUserId(js.user.id);
            }
          } catch (e) {
            console.error('Failed to get session:', e);
          }
        }

        // Load messages
        const res = await fetch(`${API_URL}/api/messages?roomId=${roomId}`);
        if (res.ok && mounted) {
          const msgs = await res.json();
          setMessages(msgs);
          
          // Get other user info from first message
          if (msgs.length > 0 && msgs[0].senderId) {
            const other = msgs.find(m => m.senderId !== session?.user?.id);
            if (other) {
              setOtherUser({
                id: other.senderId,
                name: other.senderName || 'User',
              });
            }
          }
        }
      } catch (err) {
        console.error('Error loading chat:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [roomId]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim() || !userId) return;
    
    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          roomId,
          content: text,
          senderId: userId,
        }),
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      setText('');
      
      // Refresh messages
      const fetchRes = await fetch(`${API_URL}/api/messages?roomId=${roomId}`);
      if (fetchRes.ok) setMessages(await fetchRes.json());
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message: ' + err.message);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
            <p className="text-slate-600 font-medium">Loading chat...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 font-semibold text-lg">Please log in to chat</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col pt-20 pb-6">
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-slate-500 hover:text-slate-700 text-2xl"
          >
            ←
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-lg font-bold text-slate-900">
              {otherUser?.name || 'Chat'}
            </h2>
            <p className="text-xs text-slate-500">Room: {roomId.slice(0, 8)}...</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-full transition">
              🔔
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition">
              ⋯
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-b from-white via-blue-50 to-slate-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-slate-400">
                <p className="text-xl mb-2">💬</p>
                <p className="font-medium">Start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((m, index) => {
              const isOwn = m.senderId === userId;
              return (
                <div
                  key={m._id || m.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                      isOwn
                        ? 'bg-emerald-500 text-white rounded-br-none shadow-md'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm break-words">{m.content}</p>
                    <p className={`text-xs mt-1.5 ${isOwn ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {new Date(m.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <form onSubmit={send} className="flex gap-3">
            <input
              type="text"
              className="flex-1 px-6 py-3 bg-slate-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition text-slate-900 placeholder-slate-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              disabled={!userId}
            />
            <button
              type="submit"
              disabled={!text.trim() || !userId}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-semibold rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
