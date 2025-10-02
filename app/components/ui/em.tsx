"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const Em = React.forwardRef<HTMLElement, EmProps>(
  ({ className, ...props }, ref) => {
    return (
      <em
        ref={ref}
        className={cn(
          "font-medium font-times italic text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Em.displayName = "Em";

export { Em };
