import { NextRequest, NextResponse } from 'next/server';
import { sendGmail } from '@/lib/integrations/gmail';

export async function POST(req: NextRequest) {
  const { workspaceId, to, subject, body } = await req.json();
  if (!workspaceId || !to || !subject || !body) return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  try {
    await sendGmail(workspaceId, to, subject, body);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


