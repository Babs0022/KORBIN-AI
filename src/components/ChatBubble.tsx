import * as React from "react";
import { cn } from "./ui/button";

export function ChatBubble({ role, children, className }: { role: "user" | "assistant"; children: React.ReactNode; className?: string; }) {
  const isUser = role === "user";
  return (
    <div className={cn("w-full flex", isUser ? "justify-end" : "justify-start")}> 
      <div
        className={cn(
          "max-w-[80%] rounded-3xl px-4 py-3 text-sm",
          isUser
            ? "bg-white/10 text-white border border-white/20 shadow-md"
            : "glass-card text-white border border-white/15",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}


