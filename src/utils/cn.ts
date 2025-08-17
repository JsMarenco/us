// Third-party dependencies
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Current project dependencies

/**
 * Merges class names using `clsx` and resolves Tailwind CSS conflicts with `tailwind-merge`.
 *
 * @param {...any[]} args - Class values (strings, arrays, objects, etc.).
 * @returns {string} Merged class string with Tailwind conflicts resolved.
 *
 * @example
 * cn("px-4", "px-2") // => "px-2"
 * cn("text-sm", condition && "bg-red-500") // => "text-sm bg-red-500"
 */
const cn = (...args: any[]): string => {
  return twMerge(clsx(...args));
};

export default cn;
