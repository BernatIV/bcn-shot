import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { localizePath, type Locale } from "@/lib/i18n";

// **highlighted** | [label](href) | {variable}
const TOKEN_RE = /(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\)|\{\w+\})/g;
const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;
const VAR_RE = /^\{(\w+)\}$/;

/**
 * Renders the minimal inline markup used in content/copy, so translated sentences keep
 * links and highlights in the right place for each language. Internal links get the locale prefix.
 */
export function RichText({
  text,
  locale,
  vars = {},
  linkClassName = "text-foreground underline underline-offset-4",
}: {
  text: string;
  locale: Locale;
  vars?: Record<string, ReactNode>;
  linkClassName?: string;
}) {
  return text.split(TOKEN_RE).map((part, i) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-foreground">
          <RichText text={part.slice(2, -2)} locale={locale} vars={vars} linkClassName={linkClassName} />
        </span>
      );
    }
    const link = LINK_RE.exec(part);
    if (link) {
      const [, label, href] = link;
      return (
        <Link key={i} href={href.startsWith("/") ? localizePath(locale, href) : href} className={linkClassName}>
          {label}
        </Link>
      );
    }
    const variable = VAR_RE.exec(part);
    if (variable && variable[1] in vars) return <Fragment key={i}>{vars[variable[1]]}</Fragment>;
    return part;
  });
}
