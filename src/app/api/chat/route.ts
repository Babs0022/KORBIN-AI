import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { getModelClient } from '@/lib/models';
import { ProviderModel } from '@/types';

export async function POST(req: NextRequest) {
  const { workspaceId, chatId, prompt, model } = await req.json();
  if (!workspaceId || !chatId || !prompt) return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  const selected: ProviderModel = (model as ProviderModel) || 'gemini-2.5-flash';
  const client = getModelClient(selected);

  const text = await client.generate(prompt);

  const message = {
    role: 'assistant',
    content: text,
    model: selected,
    timestamp: Date.now(),
  };

  await adminDb
    .collection('workspaces')
    .doc(workspaceId)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);

  return NextResponse.json({ message });
}


