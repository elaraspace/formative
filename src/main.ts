import { Plugin } from "obsidian";

import { FormativeCommands } from "@obsidian/commands.js";
import { FormativeIcons } from "@obsidian/icons/icons.js";
import { FormativeRibbonIcons } from "@obsidian/ribbonIcons.js";
import { FormativeUtils } from "@obsidian/utils.js";
import { FormativeEditorMenuEvent } from "@src/obsidian/events/editorMenuEvent.js";
import { FormativeModifyEvent } from "@src/obsidian/events/modifyEvent.js";
import { FormativeOptionTab } from "@src/obsidian/options/optionTab.js";
import { DEFAULT_OPTIONS } from "@src/obsidian/options/optionTypes.js";

import __wbg_init from "../wasm/pkg/formative_wasm.js";
// @ts-expect-error It needs to be imported directly to use it with Rollup.
import formative_wasm from "../wasm/pkg/formative_wasm_bg.wasm";

import type { FormativePluginOptions } from "@src/obsidian/options/optionTypes.ts";

/** Entry Point. */
export default class FormativePlugin extends Plugin {
    // `settings` get injected by the Obsidian client.
    settings!: FormativePluginOptions;

    utils = new FormativeUtils(this);
    private icons = new FormativeIcons();
    private ribbonIcons = new FormativeRibbonIcons(this);
    private editorMenus = new FormativeEditorMenuEvent(this);
    private modify = new FormativeModifyEvent(this);
    private commands = new FormativeCommands(this);

    /** Load and Save Options */
    async loadOptions() {
        this.settings = Object.assign(
            {},
            DEFAULT_OPTIONS,
            await this.loadData(),
        );
    }
    async saveOptions() {
        await this.saveData(this.settings);
    }

    /** Runs whenever the user starts using the plugin in Obsidian. */
    async onload() {
        await this.loadOptions();

        // Initialize WebAssembly
        await (async () => {
            await __wbg_init(await formative_wasm());
        })();

        this.addSettingTab(new FormativeOptionTab(this.app, this));

        this.icons.registerIcons();
        this.ribbonIcons.registerRibbonIcons();
        this.editorMenus.registerEvents();
        this.modify.registerEvents();
        this.commands.registerCommands();
    }

    /** Runs when the plugin is disabled. */
    onunload() {}
}
