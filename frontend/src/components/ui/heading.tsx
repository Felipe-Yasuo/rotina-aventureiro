import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
    children: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function Heading({ children, size = "lg", className }: HeadingProps) {
    const sizes = {
        sm: "text-2xl",
        md: "text-4xl",
        lg: "text-6xl",
    };

    return (
        <h1
            className={cn(
                "font-title text-deepTwilight drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]",
                sizes[size],
                className
            )}
        >
            {children}
        </h1>
    );
}
