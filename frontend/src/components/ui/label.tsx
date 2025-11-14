import { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label className={cn("text-deepTwilight font-text text-sm", className)} {...props} />
    );
}
