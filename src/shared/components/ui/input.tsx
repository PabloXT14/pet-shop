import type { ComponentProps } from "react"
import { IMaskInput, type IMaskInputProps } from "react-imask"

import { cn } from "@/shared/lib/utils"

type InputProps = ComponentProps<"input"> & IMaskInputProps<HTMLInputElement>

function Input({ className, type, ...props }: InputProps) {
  return (
    <IMaskInput
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-lg border border-border-primary p-3 text-base text-content-primary outline-none transition-[color,box-shadow] placeholder:text-content-secondary",

        "hover:border-border-secondary focus-visible:border-border-brand disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
