import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("max-w-5xl mx-auto px-6", className)}>
            {children}
        </div>
    );
}
