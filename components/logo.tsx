import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

/** Logo enllaçat a inici. Mentre no hi hagi el fitxer final (siteConfig.logo), tractament tipogràfic provisional. */
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
        // Provisional: substituir pel fitxer de logo d'Oriol.
        <span aria-hidden="true" className="font-display text-xl leading-none tracking-tight">
          <span className="font-normal lowercase">bcn</span> <span className="font-extrabold">SHOT</span>
        </span>
      )}
    </Link>
  );
}
