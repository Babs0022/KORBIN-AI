"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function SignIn() {
  const { signInEmail, signUpEmail, signInGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password: string) {
    return password.length >= 6;
  }

  async function handleSignIn() {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    try {
      await signInEmail(email, password);
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    }
    setLoading(false);
  }
  
  async function handleSignUp() {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    
    setLoading(true);
    try {
      await signUpEmail(email, password, name.trim());
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    }
    setLoading(false);
  }
  
  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInGoogle();
    } catch (err: any) {
      setError(err.message || "Google sign in failed");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 text-red-200 p-3">{error}</div>
      )}
      <div className="grid grid-cols-2 gap-2 glass-chip p-1 rounded-2xl text-sm">
        <button className={`py-2 rounded-xl font-medium transition-colors ${mode === 'signup' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'}`} onClick={() => setMode('signup')}>Sign Up</button>
        <button className={`py-2 rounded-xl font-medium transition-colors ${mode === 'signin' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'}`} onClick={() => setMode('signin')}>Sign In</button>
      </div>

      <div className="space-y-3">
        {mode === 'signup' && (
          <input
            className="w-full bg-white/5 text-white placeholder-white/50 rounded-2xl border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300/40 focus:border-white/30 transition-shadow ring-glow"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="w-full bg-white/5 text-white placeholder-white/50 rounded-2xl border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300/40 focus:border-white/30 transition-shadow ring-glow"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full bg-white/5 text-white placeholder-white/50 rounded-2xl border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300/40 focus:border-white/30 transition-shadow ring-glow"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {mode === 'signin' ? (
          <button
            className="w-full btn-gradient text-white px-4 py-3 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-shadow hover:shadow-lg"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        ) : (
          <button
            className="w-full btn-gradient text-white px-4 py-3 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-shadow hover:shadow-lg"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/15" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/70">Or continue with</span>
          </div>
        </div>

        <button
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-full font-medium bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
          onClick={handleGoogle}
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}


