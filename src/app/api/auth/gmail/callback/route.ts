import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient, saveWorkspaceGmailToken } from '@/lib/integrations/gmail';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const workspaceId = searchParams.get('state');
  if (!code || !workspaceId) return NextResponse.json({ error: 'invalid oauth callback' }, { status: 400 });

  const oauth2Client = getOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);
  await saveWorkspaceGmailToken(workspaceId, tokens as any);
  return NextResponse.redirect(`/workspaces/${workspaceId}/settings?gmail=connected`);
}


