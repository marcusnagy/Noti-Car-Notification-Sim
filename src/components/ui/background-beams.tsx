"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 opacity-50 dark:opacity-25",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 dark:from-primary/10 dark:to-secondary/10" />
    </div>
  );
};