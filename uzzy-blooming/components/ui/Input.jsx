"use client";

export default function Input({ label, className = '', ...props }) {
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm font-semibold text-primary">{label}</span> : null}
      <input
        className={`w-full rounded-xl border border-primary/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent ${className}`}
        {...props}
      />
    </label>
  );
}
