"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ModelSelector from "@/components/ModelSelector";

export default function WorkspaceSettingsPage() {
  const { workspaceId } = useParams() as { workspaceId: string };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [defaultModel, setDefaultModel] = useState("gemini-2.5-flash" as any);
  const [memoryEnabled, setMemoryEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "workspaces", workspaceId));
      const data = snap.data() as any;
      if (data) {
        setName(data.name || "");
        setDescription(data.description || "");
        setDefaultModel(data.defaultModel || "gemini-2.5-flash");
        setMemoryEnabled(Boolean(data.memoryEnabled));
      }
    })();
  }, [workspaceId]);

  async function save() {
    await setDoc(doc(db, "workspaces", workspaceId), { name, description, defaultModel, memoryEnabled }, { merge: true });
    alert("Saved");
  }

  function connectGmail() {
    window.location.href = `/api/auth/gmail/authorize?workspaceId=${workspaceId}`;
  }

  return (
    <div className="p-8">
      <div className="glass-card rounded-3xl p-6 border border-white/15">
        <h1 className="text-xl font-semibold">Workspace Settings</h1>
        <div className="mt-6">
          <div className="inline-block">
            <div className="glass-chip rounded-2xl p-1">
              <div className="flex gap-1">
                <button className="px-4 py-2 rounded-2xl bg-white/15">General</button>
                <button className="px-4 py-2 rounded-2xl text-white/70 hover:text-white">Models</button>
                <button className="px-4 py-2 rounded-2xl text-white/70 hover:text-white">Memory</button>
                <button className="px-4 py-2 rounded-2xl text-white/70 hover:text-white">Integrations</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-white/80">Name</label>
            <input className="w-full bg-white/5 text-white placeholder-white/50 rounded-2xl border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300/40 focus:border-white/30" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-white/80">Description</label>
            <textarea className="w-full bg-white/5 text-white placeholder-white/50 rounded-2xl border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300/40 focus:border-white/30" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/80">Default Model</label>
            <ModelSelector value={defaultModel} onChange={setDefaultModel} />
          </div>
          <div className="flex items-center gap-2">
            <input id="memory" type="checkbox" checked={memoryEnabled} onChange={(e) => setMemoryEnabled(e.target.checked)} />
            <label htmlFor="memory" className="text-white/80">Memory enabled</label>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button className="btn-gradient px-5 py-2.5 rounded-2xl" onClick={save}>Save</button>
          <button className="glass-chip px-5 py-2.5 rounded-2xl" onClick={connectGmail}>Connect Gmail</button>
        </div>
      </div>
    </div>
  );
}


