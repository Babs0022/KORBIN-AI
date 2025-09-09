"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignIn } from "./auth/signin";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/workspaces');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="hidden md:block">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 glass-chip rounded-full px-4 py-2">
              <img src="/logo.png" alt="KorbinAI" width={24} height={24} className="rounded" />
              <span className="text-sm">KorbinAI</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
              Work smarter with a glass-smooth copilot
            </h1>
            <p className="text-white/70 max-w-md">
              Your autonomous workspace copilot for email, docs, and workflows.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="flex items-center justify-center">
          <div className="w-full max-w-md glass-card rounded-3xl p-8 gradient-border">
            <div className="mb-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl glass-chip flex items-center justify-center">
                <img src="/logo.png" alt="KorbinAI" width={24} height={24} className="rounded" />
              </div>
              <h2 className="mt-4 text-2xl font-bold">Welcome to KorbinAI</h2>
              <p className="text-sm text-white/70">Sign in or create an account to continue</p>
            </div>
            <SignIn />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
