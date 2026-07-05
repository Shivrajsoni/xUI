"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Card_05 = ({
  text = "Hover over me",
  revealText = "You found me",
  children,
  className,
}: {
  text?: string;
  revealText?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function moveTo(clientX: number) {
    if (!cardRef.current) return;
    const { left, width } = cardRef.current.getBoundingClientRect();
    const relativeX = clientX - left;
    setWidthPercentage(Math.min(100, Math.max(0, (relativeX / width) * 100)));
  }

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    moveTo(event.clientX);
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    moveTo(event.touches[0]!.clientX);
  }

  const rotateDeg = (widthPercentage - 50) * 0.08;
  const snap = isMouseOver
    ? { duration: 0 }
    : { duration: 0.45, ease: "easeOut" as const };

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "relative w-fit max-w-full overflow-hidden rounded-2xl px-8 py-6 sm:px-10 sm:py-8",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-white/[0.08] dark:bg-[#0b0b0f] dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Ambient spotlight that trails the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 dark:hidden"
        style={{
          opacity: isMouseOver ? 1 : 0,
          background: `radial-gradient(420px circle at ${widthPercentage}% 50%, rgba(59,130,246,0.08), transparent 65%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden transition-opacity duration-500 dark:block"
        style={{
          opacity: isMouseOver ? 1 : 0,
          background: `radial-gradient(420px circle at ${widthPercentage}% 50%, rgba(120,119,198,0.12), transparent 65%)`,
        }}
      />

      {children}

      {/* Stage — sized by the text itself; hidden and revealed layers share geometry */}
      <div className="relative">
        {/* Hidden layer defines the natural width/height */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_25%,white_75%,transparent)]">
          <p className="whitespace-nowrap py-4 font-serif text-3xl italic leading-tight text-zinc-300 dark:text-zinc-800 sm:text-5xl">
            {text}
          </p>
          <ClientStars />
        </div>

        {/* Revealed layer — clipped to the cursor position */}
        <motion.div
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : { clipPath: `inset(0 ${100 - widthPercentage}% 0 0)` }
          }
          transition={snap}
          className="absolute inset-0 z-20 flex items-center bg-white will-change-transform dark:bg-[#0b0b0f]"
        >
          <p className="whitespace-nowrap py-4 font-serif text-3xl italic leading-tight sm:text-5xl">
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:via-white dark:to-zinc-400 dark:[text-shadow:0_0_40px_rgba(255,255,255,0.15)]">
              {revealText}
            </span>
          </p>
        </motion.div>

        {/* Scan line with soft glow */}
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={snap}
          className="absolute inset-y-0 z-50 w-px will-change-transform"
        >
          <div className="h-full w-px bg-gradient-to-b from-transparent via-zinc-900/60 to-transparent dark:via-white/70" />
          <div className="absolute inset-y-0 -left-3 w-6 bg-gradient-to-b from-transparent via-sky-500/20 to-transparent blur-md dark:via-indigo-400/30" />
        </motion.div>
      </div>
    </div>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random() * 0.8;
  const random = () => Math.random();
  return (
    <div className="absolute inset-0" aria-hidden>
      {[...Array(60)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: "1.5px",
            height: "1.5px",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-zinc-400 dark:bg-white"
        />
      ))}
    </div>
  );
};

const MemoizedStars = memo(Stars);

const ClientStars = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <MemoizedStars /> : null;
};

export default Card_05;
