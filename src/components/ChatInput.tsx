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
    <div className="p-4">
      <div className="glass-card rounded-3xl p-3 border border-white/15 flex items-center gap-3">
        <div className="shrink-0">
          <ModelSelector value={model} onChange={setModel} />
        </div>
        <input
          className="flex-1 bg-transparent text-white placeholder-white/50 border-none outline-none px-2 py-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your workspace..."
        />
        <button className="btn-gradient rounded-2xl px-5 py-2.5 disabled:opacity-50" onClick={send} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}


