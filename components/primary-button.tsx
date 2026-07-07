"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-300 disabled:text-slate-500",
  secondary:
    "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 disabled:text-slate-300 disabled:border-slate-200",
};

export default function PrimaryButton({
  variant = "primary",
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
