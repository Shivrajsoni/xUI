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
      <motion.div className="absolute h-[38px] w-[38px]">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className={clsx(
              "items-center jusify-center",
              "absolute inset-0 rounded-full",
              "border-2 border-bg-linear-to-br via-gray-500 to-transparent "
            )}
            animate={{
              rotate: 360,
              scale: [1, 1.05 + i * 0.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div
              className={clsx(
                "absolute inset-0 rounded-full mix-blend-screen",
                "items-center justify-center",
                `bg-[radial-gradient(ellipse_at_center
                )}/10%,transparent_70%)]`
              )}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Loader01;
