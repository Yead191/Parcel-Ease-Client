import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for conditional classNames

const Avatar = ({ className, ...props }) => (
    <AvatarPrimitive.Root
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
    />
);

const AvatarImage = ({ className, ...props }) => (
    <AvatarPrimitive.Image
        className={cn("h-full w-full object-cover", className)}
        {...props}
    />
);

const AvatarFallback = ({ className, ...props }) => (
    <AvatarPrimitive.Fallback
        className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-500",
            className
        )}
        {...props}
    />
);

export { Avatar, AvatarImage, AvatarFallback };
