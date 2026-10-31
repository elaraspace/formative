import { beforeEach, describe, expect, it, vi } from "vitest";

const obsidian = vi.hoisted(() => ({ locale: "en" }));
type GermanLocale = typeof import("./locale/de.json");

vi.mock("obsidian", () => ({
    moment: {
        locale: () => obsidian.locale,
    },
}));

const loadLanguageModule = async (locale: string) => {
    obsidian.locale = locale;
    return import("./lang.js");
};

describe("getLocale", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.doUnmock("./locale/de.json");
    });

    it("returns a translation for the detected locale", async () => {
        const { getLocale, LOCALE_CATEGORY } = await loadLanguageModule("de");

        expect(getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document")).toBe(
            "Dokument formatieren",
        );
    });

    it("falls back to English when a translation is empty", async () => {
        vi.doMock("./locale/de.json", async () => {
            const { default: de } = await vi.importActual<{
                default: GermanLocale;
            }>("./locale/de.json");

            return {
                default: {
                    ...de,
                    commands: {
                        ...de.commands,
                        "Format Document": "",
                    },
                },
            };
        });

        const { getLocale, LOCALE_CATEGORY } = await loadLanguageModule("de");

        expect(getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document")).toBe(
            "Format Document",
        );
    });

    it("falls back to English for an unsupported locale", async () => {
        const { getLocale, LOCALE_CATEGORY } = await loadLanguageModule(
            "non-existing-language",
        );

        expect(getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document")).toBe(
            "Format Document",
        );
    });

    it("returns the invalid-value marker for an unknown key", async () => {
        const { getLocale, LOCALE_CATEGORY } = await loadLanguageModule("en");

        expect(getLocale(LOCALE_CATEGORY.COMMANDS, "Unknown command")).toBe(
            "INVALID_VALUE (UNREACHABLE)",
        );
    });
});

describe("getWasmLocale", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.doUnmock("./locale/de.json");
    });

    it("returns localized Wasm messages", async () => {
        const { getWasmLocale } = await loadLanguageModule("ko");

        expect(
            getWasmLocale().parsing["Failed to parse the document."],
        ).toBe("문서를 읽지 못했습니다.");
    });

    it("fills empty Wasm translations with their English values", async () => {
        vi.doMock("./locale/de.json", async () => {
            const { default: de } = await vi.importActual<{
                default: GermanLocale;
            }>("./locale/de.json");

            return {
                default: {
                    ...de,
                    wasm: {
                        ...de.wasm,
                        formatting: {
                            ...de.wasm.formatting,
                            "Failed to read options. Some of them are possibly not positive number values.":
                                "",
                        },
                    },
                },
            };
        });

        const { getWasmLocale } = await loadLanguageModule("de");

        expect(
            getWasmLocale().formatting[
                "Failed to read options. Some of them are possibly not positive number values."
            ],
        ).toBe(
            "Failed to read options. Some of them are possibly not positive number values.",
        );
    });
});
