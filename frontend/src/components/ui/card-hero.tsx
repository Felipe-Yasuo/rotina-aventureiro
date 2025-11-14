import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CardHero({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "bg-white/40 backdrop-blur-md border border-fogGray shadow-md",
                "rounded-2xl p-8 text-deepTwilight",
                className
            )}
        >
            {children}
        </div>
    );
}
