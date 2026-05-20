import type * as React from "react"

import { cn } from "@/shared/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content flex min-h-21 w-full rounded-lg border border-border-primary p-3 text-base text-content-primary outline-none transition-[color,box-shadow] placeholder:text-content-secondary",

        "hover:border-border-secondary focus-visible:border-border-brand disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
