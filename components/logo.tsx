import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

/** Logo linking to the homepage. Until the final file is in place (siteConfig.logo), a provisional typographic treatment is used. */
export function Logo({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const { logo } = siteConfig;
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${siteConfig.name}, ir a inicio`}
      className={cn("inline-flex items-center", className)}
    >
      {logo ? (
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt=""
          sizes="170px"
          className="h-8 w-auto md:h-9"
          preload
        />
      ) : (
        // Provisional: replace with Oriol's logo file.
        <span aria-hidden="true" className="font-display text-xl leading-none tracking-tight">
          <span className="font-normal lowercase">bcn</span> <span className="font-extrabold">SHOT</span>
        </span>
      )}
    </Link>
  );
}
