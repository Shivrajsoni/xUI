import { Snowflake, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Animated xUI mark — a slowly rotating snowflake wrapped in a frost glow.
 * On hover the spin accelerates, the glow blooms, and tiny sparkles ignite.
 * Pure CSS; safe in server components.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "group/logo relative inline-flex h-7 w-7 items-center justify-center",
        className
      )}
    >
      {/* Frost bloom */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35),rgba(59,130,246,0.12)_55%,transparent_75%)] opacity-60 blur-[3px] transition-all duration-500 group-hover/logo:opacity-100 group-hover/logo:blur-[5px] group-hover/logo:scale-125"
      />
      {/* Icy halo ring, revealed on hover */}
      <span
        aria-hidden
        className="absolute inset-[-3px] rounded-full border border-sky-400/0 transition-colors duration-500 group-hover/logo:border-sky-400/40"
      />
      {/* Ghost flake — soft cyan echo behind the crisp one */}
      <Snowflake
        aria-hidden
        className="absolute h-[22px] w-[22px] text-cyan-400/50 blur-[2px] motion-safe:animate-[spin_24s_linear_infinite] group-hover/logo:text-cyan-300/80"
      />
      {/* Crisp flake */}
      <Snowflake className="relative h-[22px] w-[22px] text-blue-500 transition-colors duration-300 [animation-duration:24s] motion-safe:animate-[spin_24s_linear_infinite] group-hover/logo:text-sky-400 group-hover/logo:[animation-duration:6s] dark:text-blue-400 dark:group-hover/logo:text-sky-300" />
      {/* Sparkles that ignite on hover */}
      <Sparkle
        aria-hidden
        className="absolute -right-1 -top-1 h-2 w-2 scale-0 text-sky-400 opacity-0 transition-all duration-300 delay-75 group-hover/logo:scale-100 group-hover/logo:opacity-100"
      />
      <Sparkle
        aria-hidden
        className="absolute -bottom-1 -left-1 h-1.5 w-1.5 scale-0 text-cyan-300 opacity-0 transition-all duration-300 delay-150 group-hover/logo:scale-100 group-hover/logo:opacity-100"
      />
    </span>
  );
}
