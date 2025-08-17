/**
 * Available UI languages in the application.
 * The keys are language codes, and the values are the language names.
 * Used for language switching and display purposes.
 */
export const languages = {
  en: "English",
  es: "Español",
} as const;

/**
 * The default language used when no specific language is selected.
 */
export const defaultLang = "en";

/**
 * UI translation strings for each supported language.
 * Each language key maps to an object containing localized text.
 */
export const ui: Record<keyof typeof languages, Record<string, string>> = {
  en: {},
  es: {},
};
