import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/lib/integrations/gmail';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  if (!workspaceId) return NextResponse.json({ error: 'workspaceId required' }, { status: 400 });

  const oauth2Client = getOAuthClient();
  const scopes = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/userinfo.email'];
  const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes, prompt: 'consent', state: workspaceId });
  return NextResponse.redirect(url);
}


