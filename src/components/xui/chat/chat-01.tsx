"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Paperclip, SendHorizonal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: number | string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

const seedMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hey Alex — I'm ready when you are. Ask me anything about your project.",
    time: "09:41",
  },
  {
    id: 2,
    role: "user",
    content: "Can you summarize yesterday's deploy? Anything I should worry about?",
    time: "09:42",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Deploy #482 shipped clean — 34 files, zero rollbacks. One heads-up: p95 latency on /api/search crept up 8%. Worth a look, not urgent.",
    time: "09:42",
  },
  {
    id: 4,
    role: "user",
    content: "Nice. Draft a ticket for the latency thing?",
    time: "09:43",
  },
];

const cannedReplies = [
  "Done — ticket XUI-291 drafted: “Investigate p95 latency regression on /api/search”. I tagged it perf and assigned Sam Chen.",
  "On it. Give me a second and I'll have that ready for review.",
  "Good call. I've noted that and queued a follow-up for the morning standup.",
];

function nowLabel() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-1.5" aria-label="Assistant is typing">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export type Chat01Props = {
  /** Seed conversation. Defaults to the demo transcript. */
  initialMessages?: ChatMessage[];
  /** Canned assistant replies cycled through on each send. */
  replies?: string[];
  botName?: string;
  /** Small model badge next to the bot name. Pass "" to hide. */
  model?: string;
  placeholder?: string;
  /** Called with the trimmed text whenever the user sends a message. */
  onSend?: (message: string) => void;
  className?: string;
};

const Chat_01 = ({
  initialMessages = seedMessages,
  replies = cannedReplies,
  botName = "Atlas Copilot",
  model = "gpt-4o",
  placeholder = "Message Atlas…",
  onSend,
  className,
}: Chat01Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [typing, setTyping] = useState(replies.length > 0);
  const replyIndex = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Initial demo: assistant finishes "typing" its answer to the last seed message.
  useEffect(() => {
    if (replies.length === 0) return;
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: Date.now(), role: "assistant", content: replies[0]!, time: nowLabel() },
      ]);
      replyIndex.current = 1;
    }, 2200);
    timers.current.push(t);
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const canSend = draft.trim().length > 0;

  function send() {
    if (!canSend) return;
    const text = draft.trim();
    setDraft("");
    setMessages((m) => [
      ...m,
      { id: Date.now(), role: "user", content: text, time: nowLabel() },
    ]);
    onSend?.(text);
    if (replies.length === 0) return;
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      const reply = replies[replyIndex.current % replies.length]!;
      replyIndex.current += 1;
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", content: reply, time: nowLabel() },
      ]);
    }, 1600);
    timers.current.push(t);
  }

  return (
    <div
      className={cn(
        "flex h-[520px] w-full max-w-md flex-col overflow-hidden rounded-2xl",
        "border border-zinc-200 bg-white shadow-[0_16px_50px_-24px_rgba(24,24,27,0.25)]",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 text-sky-600 ring-1 ring-inset ring-sky-500/20 dark:text-sky-400">
          <Sparkles className="h-4 w-4" aria-hidden />
          <span
            aria-hidden
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-950"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {botName}
            </p>
            {model && (
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                {model}
              </span>
            )}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
        role="log"
        aria-label="Chat messages"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "flex flex-col gap-1",
                msg.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                  msg.role === "user"
                    ? "rounded-br-md bg-sky-600 text-white dark:bg-sky-500"
                    : "rounded-bl-md border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                )}
              >
                {msg.content}
              </div>
              <span className="px-1 font-mono text-[10px] tracking-[0.12em] text-zinc-400 dark:text-zinc-600">
                {msg.time}
              </span>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-start"
            >
              <div className="rounded-2xl rounded-bl-md border border-zinc-200 bg-zinc-50 px-3 dark:border-zinc-800 dark:bg-zinc-900">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-2 py-1.5 transition-colors focus-within:border-sky-400/60 focus-within:ring-2 focus-within:ring-sky-500/15 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-sky-500/50">
          <motion.button
            type="button"
            aria-label="Attach file"
            whileTap={{ scale: 0.88 }}
            className="rounded-lg p-2 text-zinc-400 transition-colors duration-200 hover:bg-zinc-200/60 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <Paperclip className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            aria-label={micActive ? "Stop voice input" : "Record voice message"}
            aria-pressed={micActive}
            onClick={() => setMicActive((v) => !v)}
            whileTap={{ scale: 0.88 }}
            className={cn(
              "rounded-lg p-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
              micActive
                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                : "text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            )}
          >
            <motion.span
              className="block"
              animate={micActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={
                micActive
                  ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
            >
              <Mic className="h-4 w-4" />
            </motion.span>
          </motion.button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder={placeholder}
            aria-label="Message"
            className="min-w-0 flex-1 bg-transparent px-1 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-600"
          />
          <motion.button
            type="button"
            aria-label="Send message"
            onClick={send}
            disabled={!canSend}
            whileTap={canSend ? { scale: 0.9 } : undefined}
            animate={{
              backgroundColor: canSend ? "rgb(2,132,199)" : "rgba(2,132,199,0)",
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "rounded-lg p-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
              canSend
                ? "text-white shadow-[0_4px_14px_-4px_rgba(2,132,199,0.6)]"
                : "cursor-not-allowed text-zinc-300 dark:text-zinc-700"
            )}
          >
            <SendHorizonal className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Chat_01;
