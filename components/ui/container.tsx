import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-site px-5 sm:px-6 lg:px-12 xl:px-16", className)} {...props} />;
}
