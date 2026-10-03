import type { FocalPoint } from "@/content/types";

export function focalPointToObjectPosition(fp?: FocalPoint) {
  return fp ? `${fp.x}% ${fp.y}%` : undefined;
}
