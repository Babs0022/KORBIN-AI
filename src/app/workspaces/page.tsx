"use client";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/Sidebar";

export default function WorkspacesIndex() {
  const { user } = useAuth();
  if (!user) return <div className="p-6">Sign in first.</div>;
  return (
    <div className="min-h-screen flex">
      <Sidebar userId={user.uid} />
      <div className="flex-1 p-6">Select a workspace from the left.</div>
    </div>
  );
}


