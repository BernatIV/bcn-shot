import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "link";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-foreground/85 px-6 py-3.5 disabled:bg-foreground/50 disabled:cursor-not-allowed",
  secondary: "border border-foreground text-foreground hover:bg-foreground hover:text-accent-foreground px-6 py-3.5",
  link: "text-foreground underline decoration-1 underline-offset-[6px] hover:decoration-2 py-1",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-button text-[0.9375rem] font-medium tracking-wide transition-colors",
    variants[variant],
    className,
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
