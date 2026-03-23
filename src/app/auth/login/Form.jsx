"use client";

import React from "react";

export default function LoginForm({ action }) {
  return (
    <form action={action} className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Login</h1>
      <label className="block mb-2">
        <span className="text-sm text-slate-700 dark:text-slate-300">Email</span>
        <input name="email" type="email" required className="mt-1 block w-full rounded-md border px-3 py-2" />
      </label>
      <label className="block mb-4">
        <span className="text-sm text-slate-700 dark:text-slate-300">Password</span>
        <input name="password" type="password" required className="mt-1 block w-full rounded-md border px-3 py-2" />
      </label>
      <button type="submit" className="w-full py-2 rounded bg-emerald-600 text-white">Sign in</button>
    </form>
  );
}
