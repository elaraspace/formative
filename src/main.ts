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
// @ts-expect-error Rollup exposes the WASM loader as a default export, unlike wasm-pack's generated declaration.
import wasmLoader from "../wasm/pkg/formative_wasm_bg.wasm";

import type { FormativePluginOptions } from "@src/obsidian/options/optionTypes.ts";

const loadWasm = wasmLoader as unknown as () => Promise<WebAssembly.Module>;

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
    async loadOptions(): Promise<void> {
        const savedOptions: unknown = await this.loadData();
        this.settings =
            typeof savedOptions === "object" && savedOptions !== null
                ? Object.assign({}, DEFAULT_OPTIONS, savedOptions)
                : DEFAULT_OPTIONS;
    }
    async saveOptions(): Promise<void> {
        await this.saveData(this.settings);
    }

    /** Runs whenever the user starts using the plugin in Obsidian. */
    async onload(): Promise<void> {
        await this.loadOptions();

        // Initialize WebAssembly
        await (async () => {
            await __wbg_init(await loadWasm());
        })();

        this.addSettingTab(new FormativeOptionTab(this.app, this));

        this.icons.registerIcons();
        this.ribbonIcons.registerRibbonIcons();
        this.editorMenus.registerEvents();
        this.modify.registerEvents();
        this.commands.registerCommands();
    }

    /** Runs when the plugin is disabled. */
    onunload(): void {}
}
