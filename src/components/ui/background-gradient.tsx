import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative group/card",
        className
      )}
    >
      <div
        className="absolute -inset-px bg-gradient-to-r from-neutral-400/10 via-neutral-400/25 to-neutral-400/10 
        rounded-[inherit] group-hover/card:opacity-100 opacity-50 transition duration-500"
      />
      {children}
    </div>
  );
};