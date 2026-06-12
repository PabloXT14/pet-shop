import Link, { type LinkProps } from "next/link"

import { DogIcon } from "@/shared/assets/icons/dog-icon"
import { cn } from "@/shared/lib/utils"

type LogoProps = LinkProps & {
  className?: string
}

export const Logo = ({ href = "/", className, ...props }: LogoProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-br-xl bg-background-quaternary px-5 py-3",
        className,
      )}
      {...props}
    >
      <DogIcon className="size-5 text-content-brand" />

      <span className="font-bold font-family-title text-base text-content-brand uppercase">
        Mundo Pet
      </span>
    </Link>
  )
}
