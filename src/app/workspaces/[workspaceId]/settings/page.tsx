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
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-semibold">Workspace Settings</h1>
      <div className="space-y-2">
        <label className="text-sm">Name</label>
        <input className="border rounded px-3 py-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="text-sm">Description</label>
        <textarea className="border rounded px-3 py-2 w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="text-sm">Default Model</label>
        <ModelSelector value={defaultModel} onChange={setDefaultModel} />
      </div>
      <div className="flex items-center gap-2">
        <input id="memory" type="checkbox" checked={memoryEnabled} onChange={(e) => setMemoryEnabled(e.target.checked)} />
        <label htmlFor="memory">Memory enabled</label>
      </div>
      <div className="flex gap-2">
        <button className="bg-black text-white px-4 py-2 rounded" onClick={save}>Save</button>
        <button className="px-4 py-2 border rounded" onClick={connectGmail}>Connect Gmail</button>
      </div>
    </div>
  );
}


