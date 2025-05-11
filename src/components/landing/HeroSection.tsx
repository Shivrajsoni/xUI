"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import BrowseComponentsButton from "../ui/BrowseComponentsButton";
import Features from "./Features";
import { Link } from "next-view-transitions";
import Card_01 from "../xui/card/card-01";
import AIInput_01 from "../xui/ai-input/ai-input-01";
import Btn03 from "../xui/button/btn-03";
import LoaderHomePage from "../xui/loader-for-home-page";
import VercelV0Chat from "../xui/vercel-chat";
import Card_05 from "../xui/card/card-05";

const HeroSection = () => {
  return (
    <div className="mx-auto w-full max-w-7xl min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 py-12 md:py-16 lg:py-20">
      <div className="w-full lg:w-[45%] flex flex-col items-start text-left space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-100">
            Designed with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400">
              Precision
            </span>
            <br />
            Developed with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-fuchsia-500 to-rose-500 dark:from-purple-400 dark:via-fuchsia-400 dark:to-rose-400">
              Love
            </span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-start w-full"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-300 pb-3 text-start flex items-center gap-2">
            <span className="flex items-center gap-1.5">
              Now updated for Tailwind CSS 4.0!
              <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </span>
            </span>
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3">
            <BrowseComponentsButton />
          </div>
        </motion.div>
        <Features />
      </div>
      <div className="w-full lg:w-[55%] flex flex-col justify-between gap-6 lg:pl-8">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center"
        >
          <div className="w-full flex flex-col items-center justify-center ">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2">
              {/* <Card_01 /> */}
            </span>
            <Card_01 />
          </div>
          <div className="w-full max-w-[600px] bg-transparent">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2">
              <LoaderHomePage />
            </span>
            {/* <ActionSearchBar /> */}
            {/* <Card02 /> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2">
            <VercelV0Chat />
          </span>

          <div className="w-full h-48 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            {/* <AIInput_04 /> */}
            <Card_05
              text="Msg for Harkirat Bhaiya "
              revealText="Thnx for Guidance "
              className="text-bold"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="w-full">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2">
              Buttons
            </span>
            <div className="w-full h-48 rounded-xl  border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-3">
              <Link href="/docs/components/button">
                <Btn03 className=" w-42 py-5" />
              </Link>
            </div>
          </div>
          <div className="w-full">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2"></span>
            {/* <Link href="/docs/components/input"><Input01 /></Link> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
