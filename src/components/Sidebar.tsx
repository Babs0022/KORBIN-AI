"use client";
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar({ userId }: { userId: string }) {
  const { user, logout } = useAuth();
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'workspaces'), (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as any)).filter((w) => w.ownerId === userId || (w.members || []).includes(userId));
      setWorkspaces(items);
    });
    return () => unsub();
  }, [userId]);

  async function createWorkspace() {
    const name = prompt('Workspace name') || 'Untitled';
    const now = Date.now();
    await addDoc(collection(db, 'workspaces'), {
      name,
      ownerId: userId,
      members: [],
      createdAt: now,
      defaultModel: 'gemini-2.5-flash',
      memoryEnabled: true,
    });
  }

  if (isCollapsed) {
    return (
      <div className="w-16 glass border-r border-white/10 h-full flex flex-col items-center py-4">
        <button 
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="mt-4 space-y-2">
          <button 
            onClick={createWorkspace}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="New workspace"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 glass border-r border-white/10 h-full flex flex-col text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="KorbinAI" width={24} height={24} />
            <span className="font-semibold">KorbinAI</span>
          </div>
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full glass-chip flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-white/70 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Workspaces</h3>
            <button 
              onClick={createWorkspace}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              title="New workspace"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="space-y-1">
            {workspaces.map((w) => (
              <Link 
                key={w.id} 
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors group" 
                href={`/workspaces/${w.id}`}
              >
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-white/80 group-hover:text-white truncate">{w.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}


