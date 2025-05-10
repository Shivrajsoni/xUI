"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { createContext, useState, useContext, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Clock, Heart } from "lucide-react";
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
  perspective = 1000,
  rotationIntensity = 25,
  glowColor = "rgba(120, 119, 198, 0.4)",
  showGlow = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  perspective?: number;
  rotationIntensity?: number;
  glowColor?: string;
  showGlow?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Calculate rotation based on mouse position
    const x = (e.clientX - left - width / 2) / rotationIntensity;
    const y = (e.clientY - top - height / 2) / rotationIntensity;

    // Update position for glow effect
    const mouseX = (e.clientX - left) / width;
    const mouseY = (e.clientY - top) / height;
    setPosition({ x: mouseX, y: mouseY });

    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

    // Update glow position
    if (glowRef.current && showGlow) {
      glowRef.current.style.background = `radial-gradient(circle at ${
        mouseX * 100
      }% ${mouseY * 100}%, ${glowColor}, transparent 50%)`;
    }
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    if (glowRef.current && showGlow) {
      glowRef.current.style.background = "transparent";
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-20 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: `${perspective}px`,
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-out",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {showGlow && (
            <div
              ref={glowRef}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-[-1]"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(-1px)",
              }}
            />
          )}
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
  bgClassName,
  showParticles = false,
  particleCount = 20,
}: {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  showParticles?: boolean;
  particleCount?: number;
}) => {
  const [isMouseEntered] = useMouseEnter();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showParticles || !particlesRef.current) return;

    // Create particles only when mouse enters
    if (isMouseEntered) {
      const particles = particlesRef.current;
      particles.innerHTML = "";

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full opacity-0";

        // Random size between 3px and 6px
        const size = Math.random() * 3 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random background color - pastel colors
        const hue = Math.floor(Math.random() * 360);
        particle.style.backgroundColor = `hsla(${hue}, 80%, 80%, 0.8)`;

        // Random animation duration between 1s and 3s
        const duration = Math.random() * 2 + 1;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;

        // Random delay
        particle.style.animationDelay = `${Math.random() * 2}s`;

        // Random transform
        const translateZ = Math.random() * 50 + 20;
        particle.style.transform = `translateZ(${translateZ}px)`;

        particles.appendChild(particle);
      }
    }
  }, [isMouseEntered, showParticles, particleCount]);

  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] relative group",
        className
      )}
    >
      {showParticles && (
        <div
          ref={particlesRef}
          className="absolute inset-0 [transform-style:preserve-3d] pointer-events-none z-10"
        />
      )}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br from-black-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500",
          bgClassName
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(-1px)",
          backfaceVisibility: "hidden",
        }}
      />
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  scale = 1,
  transition = "duration-200 ease-out",
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  scale?: number | string;
  transition?: string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn(`w-fit transition ${transition}`, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

export default function Card04() {
  return (
    <CardContainer
      className="group/card"
      perspective={1500}
      glowColor="rgba(125, 99, 255, 0.4)"
    >
      <CardBody
        className="bg-white dark:bg-gray-900 relative w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-black/[0.1] dark:border-white/[0.1] shadow-xl"
        bgClassName="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950"
        showParticles={true}
        particleCount={25}
      >
        <div className="card-shine rounded-xl"></div>

        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-indigo-800 dark:text-indigo-400 flex items-center gap-2"
        >
          <Star className="w-5 h-5" />
          Cosmic Journey
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-indigo-700 dark:text-indigo-300 text-sm max-w-sm mt-2"
        >
          Embark on an interstellar adventure through the cosmos. Hover to
          navigate through the stars.
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2822&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl shadow-md group-hover/card:shadow-xl transition-all duration-300"
            alt="Space landscape"
          />
        </CardItem>

        <CardItem translateZ="80" className="flex items-center gap-2 mt-4">
          <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100">
            Space
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
            Exploration
          </Badge>
        </CardItem>

        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={40}
            as="button"
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
          >
            <Clock className="w-4 h-4" />
            <span>10 min journey</span>
          </CardItem>

          <CardItem
            translateZ={40}
            as="button"
            className="flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400"
          >
            <Heart className="w-4 h-4" />
            <span>412 likes</span>
          </CardItem>
        </div>

        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={40}
            as="button"
            className="px-4 py-2 rounded-xl text-sm font-medium text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            Learn more
          </CardItem>

          <CardItem
            translateZ={40}
            rotateZ={-4}
            as={Button}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
          >
            Launch Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
