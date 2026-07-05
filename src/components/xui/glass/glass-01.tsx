"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bluetooth,
  Moon,
  Pause,
  Play,
  Radar,
  Sun,
  Volume2,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

/* ---------------------------------- Slider --------------------------------- */

interface GlassSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  icon: React.ReactNode;
}

const GlassSlider = ({ value, onChange, label, icon }: GlassSliderProps) => {
  const setFromClientX = (el: HTMLDivElement, clientX: number) => {
    const { left, width } = el.getBoundingClientRect();
    onChange(Math.round(Math.min(100, Math.max(0, ((clientX - left) / width) * 100))));
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.currentTarget, e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0) setFromClientX(e.currentTarget, e.clientX);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          onChange(Math.max(0, value - 5));
        }
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          onChange(Math.min(100, value + 5));
        }
      }}
      className={cn(
        "relative h-8 w-full cursor-pointer touch-none select-none overflow-hidden rounded-full",
        "bg-zinc-900/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] dark:bg-white/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:focus-visible:ring-white/40"
      )}
    >
      <motion.div
        aria-hidden
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute inset-y-0 left-0 min-w-8 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] dark:bg-zinc-100"
      />
      <span
        aria-hidden
        className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500"
      >
        {icon}
      </span>
    </div>
  );
};

/* --------------------------------- Toggles --------------------------------- */

interface ToggleTileProps {
  icon: React.ReactNode;
  label: string;
  status: string;
  active: boolean;
  activeClass: string;
  onClick: () => void;
}

const ToggleRow = ({ icon, label, status, active, activeClass, onClick }: ToggleTileProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    aria-label={`${label} — ${status}`}
    whileTap={{ scale: 0.96 }}
    transition={spring}
    className="group flex w-full items-center gap-2.5 rounded-xl p-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:focus-visible:ring-white/40"
  >
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
        active
          ? cn(activeClass, "text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]")
          : "bg-zinc-900/10 text-zinc-600 group-hover:bg-zinc-900/15 dark:bg-white/15 dark:text-zinc-300 dark:group-hover:bg-white/20"
      )}
    >
      {icon}
    </span>
    <span className="min-w-0">
      <span className="block truncate text-[11px] font-semibold leading-tight text-zinc-800 dark:text-zinc-100">
        {label}
      </span>
      <span className="block truncate text-[10px] leading-tight text-zinc-500 dark:text-zinc-400">
        {status}
      </span>
    </span>
  </motion.button>
);

/* -------------------------------- Component -------------------------------- */

export interface Glass_01Props {
  networkName?: string;
  trackTitle?: string;
  trackArtist?: string;
  onToggle?: (control: "wifi" | "bluetooth" | "airdrop" | "focus", value: boolean) => void;
  className?: string;
}

const Glass_01 = ({
  networkName = "Rivera Home",
  trackTitle = "Midnight City",
  trackArtist = "M83",
  onToggle,
  className,
}: Glass_01Props) => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [focus, setFocus] = useState(false);
  const [brightness, setBrightness] = useState(72);
  const [volume, setVolume] = useState(54);
  const [playing, setPlaying] = useState(true);

  const toggle = (
    key: "wifi" | "bluetooth" | "airdrop" | "focus",
    value: boolean,
    set: (v: boolean) => void
  ) => {
    set(value);
    onToggle?.(key, value);
  };

  const tile =
    "rounded-2xl border border-white/50 bg-white/45 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]";

  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 p-4 sm:p-5 dark:border-zinc-800",
        "bg-gradient-to-br from-sky-200 via-rose-100 to-indigo-200 dark:from-[#101a33] dark:via-[#231536] dark:to-[#0a1220]",
        className
      )}
    >
      {/* Backdrop blobs so the glass has something to blur */}
      <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-sky-400/50 blur-3xl dark:bg-sky-500/25" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-rose-400/40 blur-3xl dark:bg-fuchsia-500/20" />

      <div className="relative rounded-[1.35rem] border border-white/40 bg-white/50 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_20px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-zinc-900/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_50px_-20px_rgba(0,0,0,0.7)]">
        <div className="grid grid-cols-2 gap-3">
          {/* Connectivity cluster */}
          <div className={cn(tile, "flex flex-col justify-between gap-1")}>
            <ToggleRow
              icon={<Wifi aria-hidden className="h-3.5 w-3.5" />}
              label="Wi-Fi"
              status={wifi ? networkName : "Off"}
              active={wifi}
              activeClass="bg-sky-500"
              onClick={() => toggle("wifi", !wifi, setWifi)}
            />
            <ToggleRow
              icon={<Bluetooth aria-hidden className="h-3.5 w-3.5" />}
              label="Bluetooth"
              status={bluetooth ? "On" : "Off"}
              active={bluetooth}
              activeClass="bg-sky-500"
              onClick={() => toggle("bluetooth", !bluetooth, setBluetooth)}
            />
            <ToggleRow
              icon={<Radar aria-hidden className="h-3.5 w-3.5" />}
              label="AirDrop"
              status={airdrop ? "Everyone" : "Off"}
              active={airdrop}
              activeClass="bg-sky-500"
              onClick={() => toggle("airdrop", !airdrop, setAirdrop)}
            />
          </div>

          {/* Focus + sliders column */}
          <div className="flex flex-col gap-3">
            <div className={tile}>
              <ToggleRow
                icon={<Moon aria-hidden className="h-3.5 w-3.5" />}
                label="Focus"
                status={focus ? "Do Not Disturb" : "Off"}
                active={focus}
                activeClass="bg-indigo-500"
                onClick={() => toggle("focus", !focus, setFocus)}
              />
            </div>
            <div className={cn(tile, "flex flex-1 flex-col justify-center gap-2")}>
              <p className="px-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Display
              </p>
              <GlassSlider
                value={brightness}
                onChange={setBrightness}
                label="Brightness"
                icon={<Sun aria-hidden className="h-3.5 w-3.5" />}
              />
            </div>
          </div>
        </div>

        {/* Volume */}
        <div className={cn(tile, "mt-3 flex flex-col gap-2")}>
          <p className="px-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Sound
          </p>
          <GlassSlider
            value={volume}
            onChange={setVolume}
            label="Volume"
            icon={<Volume2 aria-hidden className="h-3.5 w-3.5" />}
          />
        </div>

        {/* Music mini-row */}
        <div className={cn(tile, "mt-3 flex items-center gap-3")}>
          <div
            aria-hidden
            className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-zinc-800 dark:text-zinc-100">
              {trackTitle}
            </p>
            <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
              {trackArtist}
            </p>
          </div>
          {playing && (
            <span aria-hidden className="flex items-end gap-[2px]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ height: [4, 11, 5, 9, 4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                  className="w-[2.5px] rounded-full bg-sky-500 dark:bg-sky-400"
                />
              ))}
            </span>
          )}
          <motion.button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            whileTap={{ scale: 0.88 }}
            transition={spring}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900/10 text-zinc-700 transition-colors hover:bg-zinc-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 dark:bg-white/15 dark:text-zinc-100 dark:hover:bg-white/20 dark:focus-visible:ring-white/40"
          >
            {playing ? (
              <Pause aria-hidden className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Play aria-hidden className="ml-0.5 h-3.5 w-3.5 fill-current" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Glass_01;
