"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "rounded-button px-xl py-lg bg-gradient-btn text-gray-50 hover:brightness-110 disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400",
  secondary:
    "rounded-button px-xl py-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400",
  ghost:
    "rounded-card-sm border border-gray-200 px-lg py-sm bg-transparent text-gray-700 hover:bg-gray-50 disabled:border-gray-100 disabled:text-gray-300",
};

export default function PrimaryButton({
  variant = "primary",
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`w-full flex items-center justify-center text-label font-semibold transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
