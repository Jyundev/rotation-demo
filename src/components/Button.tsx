"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-150 active:scale-95 select-none disabled:opacity-40 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:brightness-105",
      secondary:
        "bg-white text-pink-600 border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50",
      ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
      danger:
        "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-200",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm min-h-[40px]",
      md: "px-6 py-3.5 text-base min-h-[52px]",
      lg: "px-8 py-4 text-lg min-h-[60px]",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
