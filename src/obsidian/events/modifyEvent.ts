import { EventRef, TFile } from "obsidian";

import FormativePlugin from "@src/main.js";

export class FormativeModifyEvent {
    private plugin: FormativePlugin;

    constructor(plugin: FormativePlugin) {
        this.plugin = plugin;
    }

    private timer: number | null = null;
    private timerDelay = 1000;

    registerEvents(): void {
        this.getEventsArr().forEach((item) => {
            this.plugin.registerEvent(item);
        });
    }

    private getEventsArr(): EventRef[] {
        return [
            this.plugin.app.vault.on("modify", (file) => {
                this.timer = window.setTimeout(async () => {
                    if (
                        this.plugin.settings.otherOptions.formatOnSave &&
                        file instanceof TFile &&
                        file.extension === "md"
                    ) {
                        await this.plugin.app.vault.process(file, (data) => {
                            return this.plugin.utils.formatText(data);
                        });
                    }
                }, this.timerDelay);
            }),
            this.plugin.app.workspace.on("editor-change", () => {
                if (!this.timer) return;
                window.clearTimeout(this.timer);
            }),
        ];
    }
}
