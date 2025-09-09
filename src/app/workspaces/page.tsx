"use client";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/Sidebar";

export default function WorkspacesIndex() {
  const { user } = useAuth();
  if (!user) return <div className="p-6">Sign in first.</div>;
  return (
    <div className="min-h-screen flex">
      <Sidebar userId={user.uid} />
      <div className="flex-1 p-10">
        <div className="glass-card rounded-3xl p-10 border border-white/15">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-white/70 mt-2">Select a workspace from the left or create a new one.</p>
        </div>
      </div>
    </div>
  );
}


