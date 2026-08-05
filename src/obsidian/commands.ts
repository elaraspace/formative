import { Command, Notice } from "obsidian";

import { getLocale, LOCALE_CATEGORY } from "@src/lang/lang.js";

import FormativePlugin from "../main.js";

export class FormativeCommands {
    private plugin: FormativePlugin;

    constructor(plugin: FormativePlugin) {
        this.plugin = plugin;
    }

    registerCommands() {
        this.getCommandsArr().forEach((item) => {
            this.plugin.addCommand(item);
        });
    }

    private getCommandsArr(): Command[] {
        return [
            {
                id: "formative-format",
                name: getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document"),
                icon: "formative-logo",
                editorCallback: (editor) => {
                    this.plugin.utils.formatDocument(editor);
                },
            },
            {
                id: "formative-folder",
                name: getLocale(
                    LOCALE_CATEGORY.COMMANDS,
                    "Format Notes in Current Folder",
                ),
                icon: "formative-logo",
                callback: async () => {
                    const activeFile =
                        this.plugin.app.workspace.getActiveFile();
                    if (!activeFile) {
                        new Notice(
                            getLocale(
                                LOCALE_CATEGORY.NOTICE_MESSAGES,
                                "No open document is found.",
                            ),
                        );
                        return;
                    }

                    await this.plugin.utils.formatFolderFiles(
                        activeFile.parent?.path ?? "",
                    );
                },
            },
        ];
    }
}
