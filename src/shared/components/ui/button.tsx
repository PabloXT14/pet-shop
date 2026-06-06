import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Slot } from "radix-ui"

const buttonVariants = tv({
  base: "group/button cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      brand:
        "font-family-title font-bold text-base bg-background-brand text-content-inverse rounded-lg hover:bg-background-highlights",
      outline:
        "font-family-title font-bold text-base border border-border-primary bg-background-tertiary text-content-primary hover:bg-background-secondary hover:border-border-secondary transition-colors",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 transition-colors font-medium",
      link: "text-primary underline-offset-4 hover:underline",
      remove:
        "inline-flex items-center gap-2 rounded-md border border-content-tertiary text-sm text-content-tertiary transition-all hover:bg-destructive hover:border-destructive hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      edit: "inline-flex items-center gap-2 rounded-md border border-content-tertiary text-sm text-content-tertiary transition-all hover:bg-accent-blue hover:border-accent-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    },
    size: {
      default: "h-12 px-6 py-3 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-12 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
