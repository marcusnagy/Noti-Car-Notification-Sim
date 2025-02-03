"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface HoverBorderGradientProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string;
  asChild?: boolean;
}

export const HoverBorderGradient = ({
  containerClassName,
  children,
  className,
  asChild = false,
  ...props
}: HoverBorderGradientProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <div className={cn("group relative p-[3px] overflow-hidden", containerClassName)}>
      {/* Animated border */}
      <div className="absolute inset-[-3px] rounded-[inherit]">
        <div className="inline-flex h-full w-full">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            {/* Top border */}
            <div className="absolute h-[4px] w-[150px] bg-gradient-to-r from-transparent via-orange-500 to-transparent top-0 left-0 animate-border-left-right shadow-[0_0_8px_2px_rgba(249,115,22,0.5)]" />
            {/* Right border */}
            <div className="absolute h-[150px] w-[4px] bg-gradient-to-b from-transparent via-orange-500 to-transparent top-0 right-0 animate-border-top-bottom [animation-delay:0.75s] shadow-[0_0_8px_2px_rgba(249,115,22,0.5)]" />
            {/* Bottom border */}
            <div className="absolute h-[4px] w-[150px] bg-gradient-to-r from-transparent via-orange-500 to-transparent bottom-0 right-0 animate-border-right-left [animation-delay:1.5s] shadow-[0_0_8px_2px_rgba(249,115,22,0.5)]" />
            {/* Left border */}
            <div className="absolute h-[150px] w-[4px] bg-gradient-to-b from-transparent via-orange-500 to-transparent bottom-0 left-0 animate-border-bottom-top [animation-delay:2.25s] shadow-[0_0_8px_2px_rgba(249,115,22,0.5)]" />
          </div>
        </div>
      </div>
      {/* Hover effect */}
      <div className="absolute inset-[-3px] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[inherit] blur-[2px]" />
      {/* Component content */}
      <Comp
        className={cn(
          "relative w-full px-4 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-[inherit] shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    </div>
  );
};
