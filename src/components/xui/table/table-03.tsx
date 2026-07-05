"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarX2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type EventColor = "sky" | "emerald" | "amber" | "rose";

export interface CalendarEvent {
  id: string;
  /** Day offset from today, e.g. 0 = today, 2 = in two days, -1 = yesterday */
  dayOffset: number;
  time: string;
  title: string;
  color: EventColor;
}

const defaultEvents: CalendarEvent[] = [
  { id: "e1", dayOffset: 0, time: "09:30", title: "Design sync with Maya", color: "sky" },
  { id: "e2", dayOffset: 0, time: "14:00", title: "1:1 — Alex Rivera", color: "emerald" },
  { id: "e3", dayOffset: 2, time: "11:00", title: "Sprint planning", color: "amber" },
  { id: "e4", dayOffset: 2, time: "16:30", title: "Portfolio review", color: "rose" },
  { id: "e5", dayOffset: 5, time: "10:00", title: "User interview — Sam Chen", color: "sky" },
  { id: "e6", dayOffset: -3, time: "13:00", title: "Retro board cleanup", color: "emerald" },
];

const dotColor: Record<EventColor, string> = {
  sky: "bg-sky-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

const barColor: Record<EventColor, string> = {
  sky: "bg-sky-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const dateKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

export interface Table_03Props {
  events?: CalendarEvent[];
  onSelectDay?: (date: Date) => void;
  className?: string;
}

const Table_03 = ({ events = defaultEvents, onSelectDay, className }: Table_03Props) => {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState<Date>(today);
  const [direction, setDirection] = useState(0);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + ev.dayOffset);
      const key = dateKey(d);
      map.set(key, [...(map.get(key) ?? []), ev]);
    }
    return map;
  }, [events, today]);

  const days = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [viewDate]);

  const changeMonth = (delta: number) => {
    setDirection(delta);
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  };

  const selectedEvents = (eventsByDay.get(dateKey(selected)) ?? []).sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const selectedLabel = selected.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_12px_40px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.p
            key={monthLabel}
            initial={{ x: direction * 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {monthLabel}
          </motion.p>
        </AnimatePresence>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-90 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-90 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="mt-3 grid grid-cols-7 text-center">
        {WEEKDAYS.map((d) => (
          <span
            key={d}
            className="py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="relative min-h-[192px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
            role="grid"
            aria-label={monthLabel}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="grid grid-cols-7"
          >
            {days.map((date, i) => {
              if (!date) return <span key={`pad-${i}`} aria-hidden />;
              const key = dateKey(date);
              const isToday = key === dateKey(today);
              const isSelected = key === dateKey(selected);
              const dayEvents = eventsByDay.get(key) ?? [];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelected(date);
                    onSelectDay?.(date);
                  }}
                  aria-label={date.toDateString()}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative mx-auto flex h-8 w-8 flex-col items-center justify-center rounded-full text-xs tabular-nums transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-90",
                    isSelected
                      ? "bg-sky-600 font-semibold text-white dark:bg-sky-500 dark:text-white"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
                    isToday && !isSelected && "ring-1 ring-inset ring-sky-500 text-sky-600 dark:text-sky-400 font-semibold"
                  )}
                >
                  {date.getDate()}
                  {dayEvents.length > 0 && (
                    <span className="absolute bottom-0.5 flex gap-0.5" aria-hidden>
                      {dayEvents.slice(0, 3).map((ev) => (
                        <span
                          key={ev.id}
                          className={cn(
                            "h-1 w-1 rounded-full",
                            isSelected ? "bg-white" : dotColor[ev.color]
                          )}
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selected-day events */}
      <div className="mt-3 border-t border-zinc-100 pt-3 dark:border-zinc-900">
        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {selectedLabel}
        </p>
        <div className="mt-2 min-h-[64px] space-y-1.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {selectedEvents.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-1.5 py-2 text-xs text-zinc-400 dark:text-zinc-600"
              >
                <CalendarX2 className="h-3.5 w-3.5" aria-hidden />
                No events scheduled
              </motion.p>
            ) : (
              selectedEvents.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30, delay: i * 0.04 }}
                  className="flex items-center gap-2.5 rounded-lg bg-zinc-50 px-2.5 py-1.5 dark:bg-zinc-900/60"
                >
                  <span className={cn("h-6 w-0.5 rounded-full", barColor[ev.color])} aria-hidden />
                  <span className="font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
                    {ev.time}
                  </span>
                  <span className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {ev.title}
                  </span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Table_03;
