"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <>
      {message && (
        <div className="bg-green-500/20 border border-green-500/40 text-green-300 px-4 py-3 rounded-xl text-sm mb-4 text-center">
          {message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-yellow-600 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <span className="text-4xl">🇩🇪</span>
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">Willkommen zurück</h1>
          <p className="text-slate-400">Your German B1 learning hub</p>
          <div className="flex justify-center gap-1 mt-3">
            <div className="h-1 w-8 bg-black rounded" />
            <div className="h-1 w-8 bg-red-600 rounded" />
            <div className="h-1 w-8 bg-yellow-400 rounded" />
          </div>
        </div>

        <Suspense fallback={<div className="bg-white rounded-2xl shadow-2xl p-8 text-center text-slate-400">Loading...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-slate-500 text-xs mt-6">
          Your data is stored securely. Available anywhere, on any device.
        </p>
      </div>
    </div>
  );
}
