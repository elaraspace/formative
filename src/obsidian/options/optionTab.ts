import { debounce, Notice, PluginSettingTab, Setting } from "obsidian";

import { getLocale, LOCALE_CATEGORY } from "@src/lang/lang.js";

import { FALLBACK_OPTIONS } from "./optionTypes.js";

import type { App, SettingDefinition, SettingDefinitionItem } from "obsidian";

import type FormativePlugin from "@src/main.ts";

type FormativeSettingKey =
    | "headingGaps.beforeTopLevelHeadings"
    | "headingGaps.beforeFirstSubHeading"
    | "headingGaps.beforeSubHeadings"
    | "otherGaps.afterProperties"
    | "otherGaps.beforeContents"
    | "otherGaps.beforeContentsAfterHeadings"
    | "otherGaps.beforeContentsAfterCodeBlocks"
    | "otherGaps.beforeCodeBlocks"
    | "otherGaps.beforeCodeBlocksAfterHeadings"
    | "otherGaps.beforeCalloutsAfterHeadings"
    | "otherGaps.beforeCallouts"
    | "formatOptions.insertNewline"
    | "otherOptions.notifyWhenUnchanged"
    | "otherOptions.showMoreDetailedErrorMessages"
    | "otherOptions.formatOnSave";

export class FormativeOptionTab extends PluginSettingTab {
    private plugin: FormativePlugin;
    private noticeMessages = {
        invalidNumberMessage: getLocale(
            LOCALE_CATEGORY.NOTICE_MESSAGES,
            "Please enter a valid number.\nIt must be at least 0.",
        ),
        notWholeNumberMessage: getLocale(
            LOCALE_CATEGORY.NOTICE_MESSAGES,
            "Please enter a valid number.\nIt must be a whole number.",
        ),
    };

    constructor(app: App, plugin: FormativePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    getSettingDefinitions(): SettingDefinitionItem<FormativeSettingKey>[] {
        return [
            {
                type: "group",
                heading: getLocale(
                    LOCALE_CATEGORY.OPTION_SECTIONS,
                    "Heading gaps",
                ),
                items: [
                    this.createGapDefinition(
                        "headingGaps.beforeTopLevelHeadings",
                        LOCALE_CATEGORY.HEADING_GAPS,
                        "Before top-level headings",
                        "Decides the gap before a top-level heading.",
                        FALLBACK_OPTIONS.headingGaps.beforeTopLevelHeadings ??
                            "",
                    ),
                    this.createGapDefinition(
                        "headingGaps.beforeFirstSubHeading",
                        LOCALE_CATEGORY.HEADING_GAPS,
                        "Before the first sub-level heading",
                        "Decides the child heading gap right after a parent heading.",
                        FALLBACK_OPTIONS.headingGaps.beforeFirstSubHeading ??
                            "",
                    ),
                    this.createGapDefinition(
                        "headingGaps.beforeSubHeadings",
                        LOCALE_CATEGORY.HEADING_GAPS,
                        "Before sub-level headings",
                        "Decides gaps before headings that are not top-level.",
                        FALLBACK_OPTIONS.headingGaps.beforeSubHeadings ?? "",
                    ),
                ],
            },
            {
                type: "group",
                heading: getLocale(
                    LOCALE_CATEGORY.OPTION_SECTIONS,
                    "Other gaps",
                ),
                items: [
                    this.createGapDefinition(
                        "otherGaps.afterProperties",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "After properties",
                        "Decides the gap after a property section.",
                        FALLBACK_OPTIONS.otherGaps.afterProperties ?? "",
                    ),
                    this.createGapDefinition(
                        "otherGaps.beforeContents",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "Before contents",
                        "Decides gaps before content sections. (ex: Text before headings)",
                        FALLBACK_OPTIONS.otherGaps.beforeContents ?? "",
                    ),
                    this.createGapDefinition(
                        "otherGaps.beforeContentsAfterHeadings",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "Before contents after headings",
                        'Decides gaps before "contents that are after headings."',
                        FALLBACK_OPTIONS.otherGaps
                            .beforeContentsAfterHeadings ?? "",
                    ),
                    this.createGapDefinition(
                        "otherGaps.beforeContentsAfterCodeBlocks",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "Before contents after code blocks",
                        'Decides gaps before "contents that are after code blocks."',
                        FALLBACK_OPTIONS.otherGaps
                            .beforeContentsAfterCodeBlocks ?? "",
                    ),
                    this.createGapDefinition(
                        "otherGaps.beforeCodeBlocks",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "Before code blocks",
                        "Decides gaps before code blocks.",
                        FALLBACK_OPTIONS.otherGaps.beforeCodeBlocks ?? "",
                    ),
                    this.createGapDefinition(
                        "otherGaps.beforeCodeBlocksAfterHeadings",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "Before code blocks after headings",
                        'Decides gaps before "code blocks that are after headings."',
                        FALLBACK_OPTIONS.otherGaps
                            .beforeCodeBlocksAfterHeadings ?? "",
                    ),
                    this.createGapDefinition(
                        "otherGaps.beforeCalloutsAfterHeadings",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "Before callouts after headings",
                        'Decides gaps before "callouts that are after headings."',
                        FALLBACK_OPTIONS.otherGaps
                            .beforeCalloutsAfterHeadings ??
                            "",
                    ),
                    this.createGapDefinition(
                        "otherGaps.beforeCallouts",
                        LOCALE_CATEGORY.OTHER_GAPS,
                        "Before callouts",
                        'Decides gaps before "callouts"',
                        FALLBACK_OPTIONS.otherGaps.beforeCallouts ?? "",
                    ),
                ],
            },
            {
                type: "group",
                heading: getLocale(
                    LOCALE_CATEGORY.OPTION_SECTIONS,
                    "Format options",
                ),
                items: [
                    this.createToggleDefinition(
                        "formatOptions.insertNewline",
                        LOCALE_CATEGORY.FORMAT_OPTIONS,
                        "Newline at the end of a document",
                        "Inserts a newline at the end of a document.",
                    ),
                ],
            },
            {
                type: "group",
                heading: getLocale(
                    LOCALE_CATEGORY.OPTION_SECTIONS,
                    "Other options",
                ),
                items: [
                    this.createToggleDefinition(
                        "otherOptions.notifyWhenUnchanged",
                        LOCALE_CATEGORY.OTHER_OPTIONS,
                        "Notify when no change is needed",
                        "Displays a different message when no change is needed.",
                    ),
                    this.createToggleDefinition(
                        "otherOptions.showMoreDetailedErrorMessages",
                        LOCALE_CATEGORY.OTHER_OPTIONS,
                        "More detailed error message",
                        "Displays additional information when parsing fails.",
                    ),
                    this.createToggleDefinition(
                        "otherOptions.formatOnSave",
                        LOCALE_CATEGORY.OTHER_OPTIONS,
                        "Format documents on modification",
                        "Automatically format documents after each modification. Triggers on save and autosave.",
                    ),
                ],
            },
        ];
    }

    getControlValue(key: string): unknown {
        switch (key as FormativeSettingKey) {
            case "headingGaps.beforeTopLevelHeadings":
                return this.plugin.settings.headingGaps.beforeTopLevelHeadings;
            case "headingGaps.beforeFirstSubHeading":
                return this.plugin.settings.headingGaps.beforeFirstSubHeading;
            case "headingGaps.beforeSubHeadings":
                return this.plugin.settings.headingGaps.beforeSubHeadings;
            case "otherGaps.afterProperties":
                return this.plugin.settings.otherGaps.afterProperties;
            case "otherGaps.beforeContents":
                return this.plugin.settings.otherGaps.beforeContents;
            case "otherGaps.beforeContentsAfterHeadings":
                return this.plugin.settings.otherGaps
                    .beforeContentsAfterHeadings;
            case "otherGaps.beforeContentsAfterCodeBlocks":
                return this.plugin.settings.otherGaps
                    .beforeContentsAfterCodeBlocks;
            case "otherGaps.beforeCodeBlocks":
                return this.plugin.settings.otherGaps.beforeCodeBlocks;
            case "otherGaps.beforeCodeBlocksAfterHeadings":
                return this.plugin.settings.otherGaps
                    .beforeCodeBlocksAfterHeadings;
            case "otherGaps.beforeCalloutsAfterHeadings":
                return this.plugin.settings.otherGaps
                    .beforeCalloutsAfterHeadings;
            case "otherGaps.beforeCallouts":
                return this.plugin.settings.otherGaps.beforeCallouts;
            case "formatOptions.insertNewline":
                return this.plugin.settings.formatOptions.insertNewline;
            case "otherOptions.notifyWhenUnchanged":
                return this.plugin.settings.otherOptions.notifyWhenUnchanged;
            case "otherOptions.showMoreDetailedErrorMessages":
                return this.plugin.settings.otherOptions
                    .showMoreDetailedErrorMessages;
            case "otherOptions.formatOnSave":
                return this.plugin.settings.otherOptions.formatOnSave;
            default:
                return undefined;
        }
    }

    async setControlValue(key: string, value: unknown): Promise<void> {
        switch (key as FormativeSettingKey) {
            case "headingGaps.beforeTopLevelHeadings":
                if (typeof value === "string") {
                    this.plugin.settings.headingGaps.beforeTopLevelHeadings =
                        value;
                }
                break;
            case "headingGaps.beforeFirstSubHeading":
                if (typeof value === "string") {
                    this.plugin.settings.headingGaps.beforeFirstSubHeading =
                        value;
                }
                break;
            case "headingGaps.beforeSubHeadings":
                if (typeof value === "string") {
                    this.plugin.settings.headingGaps.beforeSubHeadings = value;
                }
                break;
            case "otherGaps.afterProperties":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps.afterProperties = value;
                }
                break;
            case "otherGaps.beforeContents":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps.beforeContents = value;
                }
                break;
            case "otherGaps.beforeContentsAfterHeadings":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps.beforeContentsAfterHeadings =
                        value;
                }
                break;
            case "otherGaps.beforeContentsAfterCodeBlocks":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps
                        .beforeContentsAfterCodeBlocks = value;
                }
                break;
            case "otherGaps.beforeCodeBlocks":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps.beforeCodeBlocks = value;
                }
                break;
            case "otherGaps.beforeCodeBlocksAfterHeadings":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps
                        .beforeCodeBlocksAfterHeadings = value;
                }
                break;
            case "otherGaps.beforeCalloutsAfterHeadings":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps.beforeCalloutsAfterHeadings =
                        value;
                }
                break;
            case "otherGaps.beforeCallouts":
                if (typeof value === "string") {
                    this.plugin.settings.otherGaps.beforeCallouts = value;
                }
                break;
            case "formatOptions.insertNewline":
                if (typeof value === "boolean") {
                    this.plugin.settings.formatOptions.insertNewline = value;
                }
                break;
            case "otherOptions.notifyWhenUnchanged":
                if (typeof value === "boolean") {
                    this.plugin.settings.otherOptions.notifyWhenUnchanged =
                        value;
                }
                break;
            case "otherOptions.showMoreDetailedErrorMessages":
                if (typeof value === "boolean") {
                    this.plugin.settings.otherOptions
                        .showMoreDetailedErrorMessages = value;
                }
                break;
            case "otherOptions.formatOnSave":
                if (typeof value === "boolean") {
                    this.plugin.settings.otherOptions.formatOnSave = value;
                }
                break;
        }

        await this.plugin.saveOptions();
    }

    private createGapDefinition(
        key: FormativeSettingKey,
        category: Parameters<typeof getLocale>[0],
        name: string,
        desc: string,
        fallback: string,
    ): SettingDefinition<FormativeSettingKey> {
        return {
            name: getLocale(category, name),
            desc: getLocale(category, desc),
            control: {
                type: "text",
                key,
                placeholder: this.putDefaultIndicator(fallback),
                validate: (value) => this.validateGap(value),
            },
        };
    }

    private createToggleDefinition(
        key: FormativeSettingKey,
        category: Parameters<typeof getLocale>[0],
        name: string,
        desc: string,
    ): SettingDefinition<FormativeSettingKey> {
        return {
            name: getLocale(category, name),
            desc: getLocale(category, desc),
            control: { type: "toggle", key },
        };
    }

    private validateGap(value: string): string | undefined {
        if (value === "") return undefined;
        if (isNaN(parseInt(value)) || parseInt(value) < 0) {
            return this.noticeMessages.invalidNumberMessage;
        }
        if (this.checkDecimal(value)) {
            return this.noticeMessages.notWholeNumberMessage;
        }
        return undefined;
    }

    private checkDecimal(value: string): boolean {
        return value !== "0" && value !== "1" && parseFloat(value) % 1 !== 0;
    }

    private putDefaultIndicator(value: string): string {
        return `${value} ${
            getLocale(
                LOCALE_CATEGORY.PLACEHOLDERS,
                "(Default)",
            )
        }`;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        const debounceMsg = debounce(
            (value: string) => {
                if (value !== "") {
                    // Check if the value is a valid number
                    if (isNaN(parseInt(value)) || parseInt(value) < 0) {
                        new Notice(this.noticeMessages.invalidNumberMessage);
                        return;
                    }
                    // Check if the value is a whole number
                    if (this.checkDecimal(value)) {
                        new Notice(this.noticeMessages.notWholeNumberMessage);
                        return;
                    }
                }
            },
            1000,
            true,
        );

        containerEl.createDiv({
            cls: "setting-item-description formative-setting-warning",
            text: getLocale(
                LOCALE_CATEGORY.OPTION_WARNINGS,
                "Gap value must be a whole number and it needs to be at least 0.",
            ),
        });

        // Heading Gaps
        new Setting(containerEl)
            .setName(
                getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Heading gaps"),
            )
            .setHeading();
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.HEADING_GAPS,
                    "Before top-level headings",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.HEADING_GAPS,
                    "Decides the gap before a top-level heading.",
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.headingGaps
                                .beforeTopLevelHeadings ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.headingGaps
                            .beforeTopLevelHeadings ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.headingGaps
                            .beforeTopLevelHeadings = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.HEADING_GAPS,
                    "Before the first sub-level heading",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.HEADING_GAPS,
                    "Decides the child heading gap right after a parent heading.",
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.headingGaps
                                .beforeFirstSubHeading ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.headingGaps
                            .beforeFirstSubHeading ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.headingGaps.beforeFirstSubHeading =
                            value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.HEADING_GAPS,
                    "Before sub-level headings",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.HEADING_GAPS,
                    "Decides gaps before headings that are not top-level.",
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.headingGaps.beforeSubHeadings ??
                                "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.headingGaps.beforeSubHeadings ??
                            "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.headingGaps.beforeSubHeadings =
                            value;
                        await this.plugin.saveOptions();
                    })
            );

        // Other Gaps
        new Setting(containerEl)
            .setName(
                getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Other gaps"),
            )
            .setHeading();
        new Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "After properties"))
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    "Decides the gap after a property section.",
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps.afterProperties ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps.afterProperties ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps.afterProperties = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before contents"))
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    "Decides gaps before content sections. (ex: Text before headings)",
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps.beforeContents ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps.beforeContents ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps.beforeContents = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    "Before contents after headings",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    'Decides gaps before "contents that are after headings."',
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps
                                .beforeContentsAfterHeadings ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps
                            .beforeContentsAfterHeadings ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps
                            .beforeContentsAfterHeadings = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    "Before contents after code blocks",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    'Decides gaps before "contents that are after code blocks."',
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps
                                .beforeContentsAfterCodeBlocks ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps
                            .beforeContentsAfterCodeBlocks ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps
                            .beforeContentsAfterCodeBlocks = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before code blocks"),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    "Decides gaps before code blocks.",
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps.beforeCodeBlocks ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps.beforeCodeBlocks ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps.beforeCodeBlocks = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    "Before code blocks after headings",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    'Decides gaps before "code blocks that are after headings."',
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps
                                .beforeCodeBlocksAfterHeadings ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps
                            .beforeCodeBlocksAfterHeadings ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps
                            .beforeCodeBlocksAfterHeadings = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    "Before callouts after headings",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    'Decides gaps before "callouts that are after headings."',
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps
                                .beforeCalloutsAfterHeadings ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps
                            .beforeCalloutsAfterHeadings ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps
                            .beforeCalloutsAfterHeadings = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(getLocale(LOCALE_CATEGORY.OTHER_GAPS, "Before callouts"))
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_GAPS,
                    'Decides gaps before "callouts"',
                ),
            )
            .addText((text) =>
                text
                    .setPlaceholder(
                        this.putDefaultIndicator(
                            FALLBACK_OPTIONS.otherGaps.beforeCallouts ?? "",
                        ),
                    )
                    .setValue(
                        this.plugin.settings.otherGaps.beforeCallouts ?? "",
                    )
                    .onChange(async (value) => {
                        debounceMsg(value);

                        this.plugin.settings.otherGaps.beforeCallouts = value;
                        await this.plugin.saveOptions();
                    })
            );

        // Format Options
        new Setting(containerEl)
            .setName(
                getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Format options"),
            )
            .setHeading();
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.FORMAT_OPTIONS,
                    "Newline at the end of a document",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.FORMAT_OPTIONS,
                    "Inserts a newline at the end of a document.",
                ),
            )
            .addToggle((text) =>
                text
                    .setValue(
                        this.plugin.settings.formatOptions.insertNewline ??
                            false,
                    )
                    .onChange(async (value) => {
                        this.plugin.settings.formatOptions.insertNewline =
                            value;
                        await this.plugin.saveOptions();
                    })
            );

        // Other Options
        new Setting(containerEl)
            .setName(
                getLocale(LOCALE_CATEGORY.OPTION_SECTIONS, "Other options"),
            )
            .setHeading();
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.OTHER_OPTIONS,
                    "Notify when no change is needed",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_OPTIONS,
                    "Displays a different message when no change is needed.",
                ),
            )
            .addToggle((text) =>
                text
                    .setValue(
                        this.plugin.settings.otherOptions.notifyWhenUnchanged ??
                            false,
                    )
                    .onChange(async (value) => {
                        this.plugin.settings.otherOptions.notifyWhenUnchanged =
                            value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.OTHER_OPTIONS,
                    "More detailed error message",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_OPTIONS,
                    "Displays additional information when parsing fails.",
                ),
            )
            .addToggle((text) =>
                text
                    .setValue(
                        this.plugin.settings.otherOptions
                            .showMoreDetailedErrorMessages ?? false,
                    )
                    .onChange(async (value) => {
                        this.plugin.settings.otherOptions
                            .showMoreDetailedErrorMessages = value;
                        await this.plugin.saveOptions();
                    })
            );
        new Setting(containerEl)
            .setName(
                getLocale(
                    LOCALE_CATEGORY.OTHER_OPTIONS,
                    "Format documents on modification",
                ),
            )
            .setDesc(
                getLocale(
                    LOCALE_CATEGORY.OTHER_OPTIONS,
                    "Automatically format documents after each modification. Triggers on save and autosave.",
                ),
            )
            .addToggle((text) =>
                text
                    .setValue(
                        this.plugin.settings.otherOptions.formatOnSave ?? false,
                    )
                    .onChange(async (value) => {
                        this.plugin.settings.otherOptions.formatOnSave = value;
                        await this.plugin.saveOptions();
                    })
            );
    }
}
