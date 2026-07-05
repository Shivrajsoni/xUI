"use client";
import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

const Loader01 = () => {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center h-[200px] w-full",
        "bg-white dark:bg-black/5"
      )}
    >
      <motion.div className="absolute h-[60px] w-[60px]">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className={clsx(
              "absolute inset-0 rounded-full",
              "border-2 border-transparent border-t-zinc-900 dark:border-t-zinc-100"
            )}
            style={{
              inset: `${i * 4}px`,
              opacity: 1 - i * 0.1,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.4 + i * 0.15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader01;
