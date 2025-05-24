import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  children: React.ReactNode;
}

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        " px-2 py-1 md:px-4 md:py-2 rounded font-semibold transition-colors",
        variant === "default"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-blue-600 text-blue-600 hover:bg-blue-100",
        className
      )}
      {...props}
    />
  );
}
