import * as React from "react";
import { cn } from "./button";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full bg-white/5 text-white placeholder-white/50 rounded-2xl border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300/40 focus:border-white/30 transition-shadow ring-glow",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";


