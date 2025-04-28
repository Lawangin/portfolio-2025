import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassContainerProps {
  className?: string;
  children: ReactNode;
}

const GlassContainer = ({ className, children }: GlassContainerProps) => {
  return (
    <div
      className={cn(
        "w-full p-6 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-lg shadow-lg text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
