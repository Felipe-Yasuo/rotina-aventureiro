import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ className, ...props }: ButtonProps) {
    return (
        <button
            className={cn("px-8 py-3 rounded-xl font-title text-lg",
                "bg-frierenBlue hover:bg-skyMist transition-all shadow-lg",
                "text-deepTwilight active:scale-[0.97]",
                className
            )}
            {...props}
        />
    );
}
