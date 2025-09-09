"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/Sidebar";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";
import { db } from "@/lib/firebase/client";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const workspaceId = params?.workspaceId as string;
  const [chatId, setChatId] = useState<string | null>(null);
  const [defaultModel, setDefaultModel] = useState("gemini-2.5-flash" as any);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/");
      return;
    }
    (async () => {
      const w = await getDoc(doc(db, "workspaces", workspaceId));
      const data = w.data() as any;
      setDefaultModel(data?.defaultModel || "gemini-2.5-flash");
      const ch = await addDoc(collection(db, "workspaces", workspaceId, "chats"), {
        title: "New Chat",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setChatId(ch.id);
    })();
  }, [user, loading, workspaceId, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar userId={user.uid} />
      <div className="flex-1 flex flex-col">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="glass border-b border-white/10 p-4 flex items-center justify-between">
          <div className="font-semibold">Workspace: {workspaceId}</div>
          <a href={`/workspaces/${workspaceId}/settings`} className="text-sm glass-chip px-3 py-1.5 rounded-xl">Settings</a>
        </motion.div>
        {chatId ? (
          <>
            <MessageList workspaceId={workspaceId} chatId={chatId} />
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <ChatInput workspaceId={workspaceId} chatId={chatId} defaultModel={defaultModel} />
            </motion.div>
          </>
        ) : (
          <div className="p-6">Loading chat...</div>
        )}
      </div>
    </div>
  );
}


