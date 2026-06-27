"use client";

import type { ComponentControls, ControlField } from "@/lib/studio/types";
import { cn } from "@/lib/utils";

interface ControlsPanelProps {
  controls: ComponentControls;
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
}

export default function ControlsPanel({
  controls,
  values,
  onChange,
}: ControlsPanelProps) {
  const set = (name: string, value: unknown) =>
    onChange({ ...values, [name]: value });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
          Controls
        </span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>
      {controls.props.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={(v) => set(field.name, v)}
        />
      ))}
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
          <input
            type="color"
            value={(value as string) ?? field.default}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-zinc-200 dark:border-zinc-800 bg-transparent"
          />
        </label>
      );
    case "select":
      return (
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>{field.label}</span>
          <select
            className={inputCls}
            value={(value as string) ?? field.default}
            onChange={(e) => onChange(e.target.value)}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
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
