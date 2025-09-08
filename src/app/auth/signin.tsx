"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function SignIn() {
  const { signInEmail, signUpEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    await signInEmail(email, password).catch(console.error);
    setLoading(false);
  }
  async function handleSignUp() {
    setLoading(true);
    await signUpEmail(email, password).catch(console.error);
    setLoading(false);
  }
  async function handleGoogle() {
    setLoading(true);
    await signInGoogle().catch(console.error);
    setLoading(false);
  }

  return (
    <div className="space-y-3">
      <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button className="bg-black text-white px-3 py-2 rounded disabled:opacity-50" onClick={handleSignIn} disabled={loading}>Sign in</button>
        <button className="px-3 py-2 border rounded disabled:opacity-50" onClick={handleSignUp} disabled={loading}>Sign up</button>
        <button className="px-3 py-2 border rounded disabled:opacity-50" onClick={handleGoogle} disabled={loading}>Google</button>
      </div>
    </div>
  );
}


