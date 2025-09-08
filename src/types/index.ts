export type ProviderModel =
  | 'gemini-2.5-flash'
  | 'gemini-2.5-pro';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: number;
  integrations?: Record<string, unknown>;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  createdAt: number;
  defaultModel: ProviderModel;
  memoryEnabled: boolean;
  integrations?: Record<string, unknown>;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  model: ProviderModel;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}


