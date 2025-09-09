import { cn } from "./ui/button";
import * as React from "react";

export function GlassPanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-3xl border border-white/15", className)} {...props} />;
}

export function ActionCard({ className, icon, title, description, ...props }: React.HTMLAttributes<HTMLDivElement> & { icon?: React.ReactNode; title: string; description?: string; }) {
  return (
    <div className={cn("glass-card rounded-3xl p-5 border border-white/15 hover:shadow-2xl transition-shadow", className)} {...props}>
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-2xl glass-chip flex items-center justify-center text-white/90">
          {icon}
        </div>
        <div className="">
          <div className="font-medium text-white">{title}</div>
          {description && <div className="text-white/70 text-sm mt-1">{description}</div>}
        </div>
      </div>
    </div>
  );
}


