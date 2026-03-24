"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// use direct fetch to the mounted Better Auth endpoint

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    try {
      const resp = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await resp.json().catch(() => null);
      if (!resp.ok || data?.error) {
        setError(data?.error?.message || data?.message || "Incorrect email or password");
        setLoading(false);
        return;
      }
    
      router.push("/");
    } catch (err) {
      setError(err?.message || "Network error");
    } finally {
        await router.refresh();
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-transparent backdrop-blur-md border border-white/10 dark:border-slate-800/40 shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Sign in with email</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-700 dark:text-slate-300">Email</span>
          <input name="email" type="email" required className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm text-slate-700 dark:text-slate-300">Password</span>
          <input name="password" type="password" required className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <button type="submit" disabled={loading} className="w-full py-2 rounded bg-emerald-600 text-white">{loading ? 'Signing in...' : 'Get Started'}</button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <div className="text-sm text-slate-500">Or sign in with</div>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <form action="/api/auth/sign-in/social" method="post">
          <input type="hidden" name="provider" value="google" />
          <button type="submit" className="w-full py-2 rounded bg-white border">Google</button>
        </form>
        <form action="/api/auth/sign-in/social" method="post">
          <input type="hidden" name="provider" value="github" />
          <button type="submit" className="w-full py-2 rounded bg-white border">GitHub</button>
        </form>
      </div>
    </div>
  );
}
