"use client";

import React, { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { CalendarDays, GripVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type TaskLabel = "Design" | "Frontend" | "Backend" | "Research";

export interface KanbanTask {
  id: string;
  title: string;
  label: TaskLabel;
  assignee: string;
  avatar: string;
  due: string;
  /** Due date is close or past */
  urgent?: boolean;
}

const labelStyles: Record<TaskLabel, string> = {
  Design: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Frontend: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Backend: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Research: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const defaultTasks: KanbanTask[] = [
  {
    id: "t1",
    title: "Redesign onboarding flow",
    label: "Design",
    assignee: "Maya Patel",
    avatar: "/avatars/avatar-03.svg",
    due: "Jul 8",
    urgent: true,
  },
  {
    id: "t2",
    title: "Ship dark mode toggle",
    label: "Frontend",
    assignee: "Alex Rivera",
    avatar: "/avatars/avatar-01.svg",
    due: "Jul 11",
  },
  {
    id: "t3",
    title: "Rate-limit public API",
    label: "Backend",
    assignee: "Sam Chen",
    avatar: "/avatars/avatar-02.svg",
    due: "Jul 15",
  },
  {
    id: "t4",
    title: "Interview 5 churned users",
    label: "Research",
    assignee: "Jordan Lee",
    avatar: "/avatars/avatar-04.svg",
    due: "Jul 18",
  },
];

export interface Table_02Props {
  title?: string;
  tasks?: KanbanTask[];
  onAddTask?: (task: KanbanTask) => void;
  className?: string;
}

const Table_02 = ({
  title = "In Progress",
  tasks: initialTasks = defaultTasks,
  onAddTask,
  className,
}: Table_02Props) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = () => {
    const task: KanbanTask = {
      id: `t${Date.now()}`,
      title: "Untitled task",
      label: "Design",
      assignee: "Alex Rivera",
      avatar: "/avatars/avatar-01.svg",
      due: "Jul 25",
    };
    setTasks((prev) => [...prev, task]);
    onAddTask?.(task);
  };

  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3 shadow-[0_12px_40px_-24px_rgba(24,24,27,0.25)] dark:border-zinc-800 dark:bg-zinc-900/40",
        className
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" aria-hidden />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          <span className="rounded-full bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {tasks.length}
          </span>
        </div>
        <button
          type="button"
          onClick={addTask}
          aria-label="Add task to column"
          className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-200/60 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-90 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Cards */}
      <Reorder.Group axis="y" values={tasks} onReorder={setTasks} className="space-y-2">
        {tasks.map((task) => (
          <Reorder.Item
            key={task.id}
            value={task}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            whileDrag={{
              scale: 1.03,
              rotate: 1,
              boxShadow: "0 16px 40px -12px rgba(24,24,27,0.35)",
              cursor: "grabbing",
            }}
            className="group relative cursor-grab rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                  labelStyles[task.label]
                )}
              >
                {task.label}
              </span>
              <GripVertical
                className="h-3.5 w-3.5 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600"
                aria-hidden
              />
            </div>
            <p className="mt-2 text-[13px] font-medium leading-snug text-zinc-900 dark:text-zinc-100">
              {task.title}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={task.avatar}
                  alt=""
                  className="h-5 w-5 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800"
                />
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {task.assignee}
                </span>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] tabular-nums",
                  task.urgent
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
                )}
              >
                <CalendarDays className="h-3 w-3" aria-hidden />
                {task.due}
              </span>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Ghost add row */}
      <motion.button
        type="button"
        onClick={addTask}
        whileTap={{ scale: 0.98 }}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-300 py-2.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-300"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
        New task
      </motion.button>
    </div>
  );
};

export default Table_02;
