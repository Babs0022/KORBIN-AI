import { google } from 'googleapis';
import { adminDb } from '@/lib/firebase/admin';

export type GmailToken = {
  access_token: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expiry_date?: number;
};

export function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID as string;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI as string;
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export async function saveWorkspaceGmailToken(workspaceId: string, token: GmailToken) {
  await adminDb.collection('workspaces').doc(workspaceId).set({
    integrations: { gmail: token },
  }, { merge: true });
}

export async function getWorkspaceGmailToken(workspaceId: string): Promise<GmailToken | null> {
  const snap = await adminDb.collection('workspaces').doc(workspaceId).get();
  const data = snap.data() as any;
  return data?.integrations?.gmail || null;
}

export async function sendGmail(workspaceId: string, to: string, subject: string, body: string) {
  const token = await getWorkspaceGmailToken(workspaceId);
  if (!token) throw new Error('Gmail not connected');
  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials(token);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const messageParts = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body,
  ];
  const message = messageParts.join('\n');
  const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encodedMessage } });
}


