"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader02 = ({
  size = 100,
  colorLight = "from-teal-300 to-cyan-500",
  colorDark = "from-cyan-400 to-blue-600",
  bubbleCount = 6,
}: {
  size?: number;
  colorLight?: string;
  colorDark?: string;
  bubbleCount?: number;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render the animation on the server to avoid hydration issues
  if (!isClient) {
    return (
      <div
        className={`h-[100px] w-full rounded-full bg-gray-200 flex items-center justify-center`}
      >
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`relative h-[200px] w-full flex items-center justify-center`}
    >
      {/* Liquid Container */}
      <div
        className={`relative w-[64px] h-[64px]
        } overflow-hidden rounded-full border-4 border-slate-300 dark:border-slate-600 shadow-inner`}
      >
        {/* Liquid */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b ${colorLight} dark:${colorDark}`}
          initial={{ height: "40%" }}
          animate={{
            height: ["40%", "60%", "40%"],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {/* Wave effect */}
          <motion.div
            className="absolute top-0 left-0 w-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-full"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 10 Q 25 0, 50 10 Q 75 20, 100 10 V 30 H 0 Z"
                fill="url(#liquid-gradient)"
                animate={{
                  d: [
                    "M0 10 Q 25 0, 50 10 Q 75 20, 100 10 V 30 H 0 Z",
                    "M0 10 Q 25 20, 50 10 Q 75 0, 100 10 V 30 H 0 Z",
                    "M0 10 Q 25 0, 50 10 Q 75 20, 100 10 V 30 H 0 Z",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <defs>
                <linearGradient
                  id="liquid-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="rgba(45, 212, 191, 0.8)"
                    className="dark:stop-color-[rgba(34,211,238,0.8)]"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(6, 182, 212, 0.9)"
                    className="dark:stop-color-[rgba(37,99,235,0.9)]"
                  />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Bubbles */}
          <Bubbles count={bubbleCount} />
        </motion.div>
      </div>
    </div>
  );
};

const Bubbles = ({ count }: { count: number }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 80 + 10;
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 dark:bg-white/50"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-20%",
            }}
            animate={{
              y: [0, -60, -80],
              opacity: [0, 0.8, 0],
              scale: [1, 1.2, 0.8],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
};
export default Loader02;

// export const DemoLoader02 = () => {
//   return (
//     <Loader02
//       size={40}
//       colorLight="from-blue-400 to-blue-500"
//       colorDark="from-purple-600 to-indigo-800"
//       bubbleCount={10}
//     />
//   );
// };

// <Loader02
// size={40}
//  colorLight="from-pink-400 to-rose-500"
//  colorDark="from-purple-600 to-indigo-800"
//  bubbleCount={10}
// />
