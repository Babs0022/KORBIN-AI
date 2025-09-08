import Link from "next/link";
import { SignIn } from "./auth/signin";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full border rounded p-6 space-y-4">
        <h1 className="text-xl font-semibold">KorbinAI</h1>
        <p className="text-sm opacity-70">Sign in to continue</p>
        <SignIn />
        <div className="text-sm">
          Or go to <Link className="underline" href="/workspaces">your workspaces</Link>
        </div>
      </div>
    </main>
  );
}
