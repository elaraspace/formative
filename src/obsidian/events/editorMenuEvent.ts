import { getLocale, LOCALE_CATEGORY } from "@src/lang/lang.js";
import FormativePlugin from "@src/main.js";

import type { EventRef } from "obsidian";

export class FormativeEditorMenuEvent {
    private plugin: FormativePlugin;

    constructor(plugin: FormativePlugin) {
        this.plugin = plugin;
    }

    registerEvents(): void {
        this.getEventsArr().forEach((item) => {
            this.plugin.registerEvent(item);
        });
    }

    private getEventsArr(): EventRef[] {
        return [
            this.plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((item) =>
                    item
                        .setTitle(
                            getLocale(
                                LOCALE_CATEGORY.EDITOR_MENU,
                                "Format Document",
                            ),
                        )
                        .setIcon("formative-logo")
                        .onClick(() => {
                            this.plugin.utils.formatDocument(editor);
                        })
                );
            }),
        ];
    }
}
