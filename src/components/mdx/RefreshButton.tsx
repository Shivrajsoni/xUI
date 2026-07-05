"use client";

import * as React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface RefreshButtonProps {
    onRefresh:()=>void
}

const RefreshButton = ({onRefresh}:RefreshButtonProps) => {
  return (
    <Button
    type="button"
    onClick={onRefresh}
    className="group absolute top-24 right-2 p-2 rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-800 hover:bg-zinc-200/70 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:hover:text-white shadow-none transition-colors z-10 flex items-center gap-2 h-7 px-3"
    aria-label="Refresh preview"
    >
        <RefreshCw 
            className="transition-transform group-hover:rotate-180 duration-300"
            size={16}
        />
    <span className="text-sm font-medium">Refresh</span>
    </Button>
  )
}

export default RefreshButton
