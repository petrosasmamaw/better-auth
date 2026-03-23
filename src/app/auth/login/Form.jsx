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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <label className="block mb-2">
        <span className="text-sm text-slate-700 dark:text-slate-300">Email</span>
        <input name="email" type="email" required className="mt-1 block w-full rounded-md border px-3 py-2" />
      </label>
      <label className="block mb-4">
        <span className="text-sm text-slate-700 dark:text-slate-300">Password</span>
        <input name="password" type="password" required className="mt-1 block w-full rounded-md border px-3 py-2" />
      </label>
      <button type="submit" disabled={loading} className="w-full py-2 rounded bg-emerald-600 text-white">{loading ? 'Signing in...' : 'Sign in'}</button>
    </form>
  );
}
