"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/authClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ChatPage({ params }) {
  const { id: roomId } = params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setMessages(await res.json());
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
    if (!text || !userId) return;
    
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
          senderId: userId, // Include senderId explicitly
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
      <main className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">Loading chat...</div>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center text-red-600">Please log in to chat</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Chat - Room {roomId}</h1>
        <div className="space-y-2 mb-4 border rounded p-4 h-96 overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400">No messages yet. Start the conversation!</div>
          ) : (
            messages.map(m => (
              <div key={m._id || m.id} className={`p-3 rounded ${m.senderId === userId ? 'bg-blue-100 ml-auto' : 'bg-white'} max-w-xs`}>
                <div className="text-xs text-slate-600 font-semibold">{m.senderId === userId ? 'You' : m.senderId}</div>
                <div className="text-sm text-slate-500">{new Date(m.createdAt).toLocaleString()}</div>
                <div className="mt-1">{m.content}</div>
              </div>
            ))
          )}
        </div>
        <form onSubmit={send} className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 border rounded"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-50" disabled={!text.trim()}>
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
