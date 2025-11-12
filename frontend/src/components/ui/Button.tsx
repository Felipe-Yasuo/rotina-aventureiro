import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
    const base = "px-6 py-3 rounded-full font-semibold transition-all duration-300";
    const variants = {
        primary: "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30",
        secondary: "bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700",
    };

    return (
        <button className={twMerge(base, variants[variant], className)} {...props}>
            {children}
        </button>
    );
}

