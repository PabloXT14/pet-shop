"use client"

import type * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { tv, type VariantProps } from "tailwind-variants"

import { Button } from "@/shared/components/ui/button"
import { XIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

const dialogOverlayVariants = tv({
  base: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",

  variants: {
    variant: {
      default: "bg-black/40 backdrop-blur-xs",
      dark: "bg-black/50",
      light: "bg-white/50 backdrop-blur-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function DialogOverlay({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> &
  VariantProps<typeof dialogOverlayVariants>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={dialogOverlayVariants({ variant, className })}
      {...props}
    />
  )
}

const dialogContentVariants = tv({
  base: "-translate-x-1/2 -translate-y-1/2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full gap-7 shadow-lg rounded-xl py-10 px-5 duration-200 data-closed:animate-out data-open:animate-in sm:px-10",

  variants: {
    variant: {
      default:
        "bg-background-secondary border border-border-primary rounded-lg max-w-[calc(100%-2rem)] sm:max-w-lg",
      appointment:
        "bg-background-tertiary border-none rounded-xl max-w-[calc(100%-2.5rem)] sm:max-w-[477px] max-h-[90vh] overflow-y-auto",
      large:
        "bg-background border rounded-lg max-w-[calc(100%-2rem)] sm:max-w-2xl",
      fullscreen:
        "bg-background border rounded-lg max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] sm:max-w-4xl sm:max-h-[90vh] overflow-y-auto",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function DialogContent({
  className,
  children,
  showCloseButton = true,
  variant,
  overlayVariant,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean
    overlayVariant?: VariantProps<typeof dialogOverlayVariants>["variant"]
  }) {
  return (
    <DialogPortal>
      <DialogOverlay variant={overlayVariant} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={dialogContentVariants({ variant, className })}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              size="icon"
            >
              <XIcon className="size-5 text-content-secondary" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

const dialogHeaderVariants = tv({
  base: "flex flex-col gap-1",
  variants: {
    align: {
      left: "text-left",
      center: "text-center sm:text-left",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
})

function DialogHeader({
  align,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof dialogHeaderVariants>) {
  return (
    <div
      data-slot="dialog-header"
      className={dialogHeaderVariants({ align, className })}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

const dialogTitleVariants = tv({
  base: "font-family-title font-bold text-content-primary",
  variants: {
    size: {
      default: "text-lg",
      sm: "text-base",
      lg: "text-xl",
      xl: "text-2xl",
      modal: "text-2xl leading-8", // Nova variante
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function DialogTitle({
  size,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title> &
  VariantProps<typeof dialogTitleVariants>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={dialogTitleVariants({ size, className })}
      {...props}
    />
  )
}

const dialogDescriptionVariants = tv({
  base: "text-muted-foreground text-content-secondary",
  variants: {
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
      modal: "text-sm leading-6 font-medium", // Nova variante
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function DialogDescription({
  size,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description> &
  VariantProps<typeof dialogDescriptionVariants>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={dialogDescriptionVariants({ size, className })}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
