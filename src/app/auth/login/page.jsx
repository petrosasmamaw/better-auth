"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signIn({ email, password })).unwrap();
      router.push("/");
    } catch (err) {
      // handled by slice
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="block mb-2">
          <span className="text-sm text-slate-700 dark:text-slate-300">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <label className="block mb-4">
          <span className="text-sm text-slate-700 dark:text-slate-300">Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <button type="submit" className="w-full py-2 rounded bg-emerald-600 text-white">{status === 'loading' ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}
