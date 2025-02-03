import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    content?: React.ReactNode;
    footer?: React.ReactNode;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200/50 dark:bg-slate-800/50 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.content}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            {item.footer}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative rounded-2xl p-[2px] overflow-hidden group/card">
      <div className="absolute inset-[-2px] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-40 group-hover/card:opacity-100 transition-opacity duration-500" />
      <div
        className={cn(
          "rounded-2xl h-full w-full p-4 overflow-hidden bg-white/95 dark:bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-20 border border-neutral-200 dark:border-neutral-800",
          className
        )}
      >
        <div className="relative z-50">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black dark:text-white font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-neutral-600 dark:text-neutral-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
