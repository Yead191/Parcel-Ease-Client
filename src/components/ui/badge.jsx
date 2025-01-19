import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-sm font-medium text-primary-foreground",
                className
            )}
            {...props}
        />
    );
}
