import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Obfuscates an email address to prevent spam bot scraping.
 * Uses a simple encoding that requires JavaScript to decode.
 */
export function obfuscateEmail(email: string): string {
  return email
    .split("")
    .map((char) => {
      if (char === "@") return " [at] ";
      if (char === ".") return " [dot] ";
      return char;
    })
    .join("");
}

/**
 * Deobfuscates an email address from the obfuscated format.
 */
export function deobfuscateEmail(obfuscated: string): string {
  return obfuscated.replace(/ \[at\] /g, "@").replace(/ \[dot\] /g, ".");
}
