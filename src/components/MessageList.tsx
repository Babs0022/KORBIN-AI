"use client";
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

type Props = { workspaceId: string; chatId: string };

export default function MessageList({ workspaceId, chatId }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, 'workspaces', workspaceId, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [workspaceId, chatId]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((m) => (
        <div key={m.id} className={m.role === 'user' ? 'text-right' : ''}>
          <div className="inline-block max-w-[80%] rounded px-3 py-2 border">
            <div className="text-xs opacity-60 mb-1">{m.role}</div>
            <div className="whitespace-pre-wrap">{m.content}</div>
            <div className="text-[10px] opacity-50 mt-1">model: {m.model}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


