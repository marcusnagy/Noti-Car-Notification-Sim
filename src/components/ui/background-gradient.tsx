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
        className="absolute -inset-px bg-gradient-to-r from-purple-500/20 via-pink-500/40 to-orange-500/20 
        rounded-[inherit] group-hover/card:opacity-100 opacity-70 transition duration-500 blur-[1px]"
      />
      {children}
    </div>
  );
};