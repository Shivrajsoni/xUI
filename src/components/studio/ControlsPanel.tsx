"use client";

import type { ComponentControls, ControlField } from "@/lib/studio/types";
import { cn } from "@/lib/utils";

export type CanvasBg = "light" | "subtle" | "dark" | "dots" | "gradient";

const CANVAS_OPTIONS: { value: CanvasBg; label: string; swatch: string }[] = [
  { value: "light", label: "Light", swatch: "bg-white border border-zinc-300" },
  { value: "subtle", label: "Subtle", swatch: "bg-zinc-100 border border-zinc-300" },
  { value: "dark", label: "Dark", swatch: "bg-zinc-900" },
  { value: "dots", label: "Dots", swatch: "bg-white border border-zinc-300 [background-image:radial-gradient(theme(colors.zinc.400)_1px,transparent_1px)] [background-size:6px_6px]" },
  { value: "gradient", label: "Gradient", swatch: "bg-gradient-to-br from-violet-400 to-rose-400" },
];

interface ControlsPanelProps {
  controls?: ComponentControls;
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
  canvasBg: CanvasBg;
  onCanvasBgChange: (bg: CanvasBg) => void;
}

export default function ControlsPanel({
  controls,
  values,
  onChange,
  canvasBg,
  onCanvasBgChange,
}: ControlsPanelProps) {
  const set = (name: string, value: unknown) =>
    onChange({ ...values, [name]: value });

  return (
    <div className="flex flex-col gap-6 p-5">
      {/* Canvas background — always available */}
      <Group title="Background">
        <div className="flex flex-wrap gap-2">
          {CANVAS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onCanvasBgChange(opt.value)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                canvasBg === opt.value
                  ? "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              )}
            >
              <span className={cn("h-3.5 w-3.5 rounded", opt.swatch)} />
              {opt.label}
            </button>
          ))}
        </div>
      </Group>

      {/* Component props */}
      {controls && controls.props.length > 0 ? (
        <Group title="Properties">
          <div className="flex flex-col gap-4">
            {controls.props.map((field) => (
              <Field
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={(v) => set(field.name, v)}
              />
            ))}
          </div>
        </Group>
      ) : (
        <p className="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 p-3 text-xs text-zinc-500">
          This component has no live controls yet — adjust the background, or
          copy the code to customize it directly.
        </p>
      )}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
          {title}
        </span>
        <span className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
      </div>
      {children}
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: ControlField;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const labelCls = "text-xs font-medium text-zinc-600 dark:text-zinc-400";
  const inputCls =
    "w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-400/40";

  switch (field.type) {
    case "text":
      return (
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>{field.label}</span>
          <input
            type="text"
            className={inputCls}
            value={(value as string) ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      );
    case "number":
      return (
        <label className="flex flex-col gap-1.5">
          <span className={cn(labelCls, "flex justify-between")}>
            {field.label}
            <span className="text-zinc-400 tabular-nums">{value as number}</span>
          </span>
          <input
            type="range"
            min={field.min}
            max={field.max}
            step={field.step ?? 1}
            value={(value as number) ?? field.default}
            onChange={(e) => onChange(Number(e.target.value))}
            className="accent-zinc-900 dark:accent-zinc-100"
          />
        </label>
      );
    case "color":
      return (
        <label className="flex items-center justify-between gap-3">
          <span className={labelCls}>{field.label}</span>
          <span className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-zinc-400">
              {(value as string) ?? field.default}
            </span>
            <input
              type="color"
              value={(value as string) ?? field.default}
              onChange={(e) => onChange(e.target.value)}
              className="h-8 w-10 cursor-pointer rounded border border-zinc-200 dark:border-zinc-800 bg-transparent"
            />
          </span>
        </label>
      );
    case "select":
      return (
        <div className="flex flex-col gap-1.5">
          <span className={labelCls}>{field.label}</span>
          <div className="flex flex-wrap gap-1.5">
            {field.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                  ((value as string) ?? field.default) === opt.value
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:border-zinc-300 dark:text-zinc-400"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      );
    case "boolean":
      return (
        <label className="flex items-center justify-between gap-3">
          <span className={labelCls}>{field.label}</span>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100"
          />
        </label>
      );
    default:
      return null;
  }
}
