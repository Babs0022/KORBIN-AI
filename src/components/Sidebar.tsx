"use client";
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import Link from 'next/link';

export default function Sidebar({ userId }: { userId: string }) {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
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

  return (
    <div className="w-64 border-r h-full p-3 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">Workspaces</div>
        <button className="text-sm underline" onClick={createWorkspace}>New</button>
      </div>
      <div className="space-y-1 flex-1 overflow-y-auto">
        {workspaces.map((w) => (
          <Link key={w.id} className="block px-2 py-1 rounded hover:bg-gray-100" href={`/workspaces/${w.id}`}>{w.name}</Link>
        ))}
      </div>
    </div>
  );
}


