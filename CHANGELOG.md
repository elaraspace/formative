## 1.3.6
**Release Date:** 2026-10-31
**Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.5...1.3.6

- Improved warning message spacing on the settings screen.


## 1.3.5
**Release Date:** 2026-10-31
**Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.4...1.3.5

- Addressed feedback from the Obsidian plugin review process:
  - Enabled repository issues.
  - Included `main.js` and `manifest.json` in the release assets.
  - Avoided using Obsidian APIs newer than the declared `minAppVersion`.
  - Removed unsafe assignments to `innerHTML` and `outerHTML`.
  - Used `Setting.setHeading()` for settings headings.
  - Removed unexpected, undocumented directive comments.
  - Improved type safety for values, function calls, typed parameters, and error handling.
  - Used `window.setTimeout()` and `window.clearTimeout()` for timer management.
  - Implemented `PluginSettingTab.getSettingDefinitions()`.
  - Removed unnecessary type assertions.
