"use client";
import { useState } from 'react';
import { ProviderModel } from '@/types';
import ModelSelector from './ModelSelector';

export default function ChatInput({ workspaceId, chatId, defaultModel }: { workspaceId: string; chatId: string; defaultModel: ProviderModel }) {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<ProviderModel>(defaultModel);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceId, chatId, prompt: input, model }),
    });
    setLoading(false);
    setInput('');
  }

  return (
    <div className="border-t p-3 flex gap-2 items-center">
      <ModelSelector value={model} onChange={setModel} />
      <input
        className="flex-1 border rounded px-3 py-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="bg-black text-white px-4 py-2 rounded disabled:opacity-50" onClick={send} disabled={loading}>
        Send
      </button>
    </div>
  );
}


