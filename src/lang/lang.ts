import { moment } from "obsidian";
import de from "./locale/de.json";
import en from "./locale/en.json";
import hu from "./locale/hu.json";
import ko from "./locale/ko.json";

const detectedLanguage = moment.locale();

export const LOCALE_CATEGORY = {
    COMMANDS: "commands",
    EDITOR_MENU: "editorMenu",
    RIBBON_ICONS: "ribbonIcons",
    NOTICE_MESSAGES: "noticeMessages",
    OPTION_WARNINGS: "optionWarnings",
    PLACEHOLDERS: "placeholders",
    OPTION_SECTIONS: "optionSections",
    HEADING_GAPS: "headingGaps",
    OTHER_GAPS: "otherGaps",
    FORMAT_OPTIONS: "formatOptions",
    OTHER_OPTIONS: "otherOptions",
} as const;

type ObjectValues<T> = T[keyof T];
type LocaleCategory = ObjectValues<typeof LOCALE_CATEGORY>;

const locales: { en: typeof en; [key: string]: typeof en } = {
    en: en,
    de: de,
    hu: hu,
    ko: ko,
};

/** @example getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document") */
export const getLocale = (category: LocaleCategory, key: string): string => {
    const usingLocale = locales[detectedLanguage] ?? locales.en;
    return (
        (usingLocale[category] as Record<string, string>)[key] ||
        (locales.en[category] as Record<string, string>)[key] ||
        "INVALID_VALUE"
    );
};

/** Returns the "wasm" object in the locale file. */
export const getWasmLocale = () => {
    const usingLocale = locales[detectedLanguage] ?? locales.en;
    
    return Object.fromEntries(
        Object.entries(locales.en.wasm).map(([category, messages]) => [
            category,
            Object.fromEntries(
                Object.entries(messages).map(([key, message]) => [
                    key,
                    (usingLocale.wasm[category as keyof typeof en.wasm] as
                        Record<string, string>)[key] || message,
                ]),
            ),
        ]),
    ) as typeof en.wasm;
};
