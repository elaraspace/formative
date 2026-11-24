## 1.3.8
> - **Release Date:** 2026-10-31
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.7...1.3.8

- Add explicit return types to TypeScript functions.
- Use English translations when a string is missing from the selected locale.
- Add the Obsidian community plugin download link to the README.


## 1.3.7
> - **Release Date:** 2026-10-31
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.6...1.3.7

- Update the logo icon file.


## 1.3.6
> - **Release Date:** 2026-10-31
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.5...1.3.6

- Improve warning message spacing on the settings screen.


## 1.3.5
> - **Release Date:** 2026-10-31
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.4...1.3.5

- Address feedback from the Obsidian plugin review process:
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


## 1.3.2
> - **Release Date:** 2026-04-19
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.1...1.3.2

- Add a ribbon action and command for formatting notes in the current folder and its subfolders.
- Update Node.js usage and fix type errors, warnings, and Rollup errors.


## 1.3.1
> - **Release Date:** 2026-03-09
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.3.0...1.3.1

- Add support for more forms of callout syntax.


## 1.3.0
> - **Release Date:** 2026-03-08
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.12...1.3.0

- Add callout formatting options.
- Add more options for content sections.
- Update the message style on the settings screen.
- Add Korean translations for the new options.
- Audit dependencies.


## 1.2.12
> - **Release Date:** 2025-02-03
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.11...1.2.12

- Add translations for the Format Document ribbon icon name.
- Audit dependencies.


## 1.2.11
> - **Release Date:** 2024-11-24
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.10...1.2.11

- Update the Korean translation.
- Trigger formatting sooner when a note is modified.


## 1.2.10
> - **Release Date:** 2024-11-24
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.9...1.2.10

- Add the Format Documents on Modification option.
- Update the author name and audit dependencies.


## 1.2.9
> - **Release Date:** 2024-09-01
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.8...1.2.9

- Improve option descriptions.
- Update project metadata, refactor code, and audit dependencies.


## 1.2.8
> - **Release Date:** 2024-07-31
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.7...1.2.8

- Improve the Korean translation.
- Add more sections to the README.
- Audit dependencies.


## 1.2.7
> - **Release Date:** 2024-06-01
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.6...1.2.7

- Update the logo and example option image in the README.
- Remove the banner image.
- Improve translations.
- Refactor code, remove unused locale sections, and audit dependencies.


## 1.2.6
> - **Release Date:** 2024-05-03
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.5...1.2.6

- Parse code blocks that use more than three backticks.
- Ignore heading markers inside code blocks when determining the top heading level.
- Improve option wording and add more test cases.


## 1.2.5
> - **Release Date:** 2024-04-18
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.4...1.2.5

- Add a warning message above the options.
- Update the option example image.


## 1.2.4
> - **Release Date:** 2024-04-01
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.3...1.2.4

- Use empty values as the default for options.
- Parse a property section only when it starts on the first line.
- Audit dependencies and improve code documentation.


## 1.2.3
> - **Release Date:** 2024-03-25
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.2...1.2.3

- Fix duplicate headings.
- Add German translations.
- Improve the TypeScript code structure and project documentation.


## 1.2.2
> - **Release Date:** 2024-02-22
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.1...1.2.2

- Add translations for parsing error messages.
- Update Korean translations.
- Refactor code.


## 1.2.1
> - **Release Date:** 2024-02-15
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.2.0...1.2.1

- Add Korean and Hungarian translations.
- Improve project configuration and rename classes.


## 1.2.0
> - **Release Date:** 2024-02-11
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.1.2...1.2.0

- Add support for alternate heading syntax.
- Add an option for more detailed parsing error messages.
- Update the README, license, tests, and contributing guidelines.


## 1.1.2
> - **Release Date:** 2024-01-16
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.1.1...1.1.2

- Avoid writing a document when formatting produces no changes.
- Refactor code.


## 1.1.1
> - **Release Date:** 2023-12-29
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.1.0...1.1.1

- Warn when an option contains a non-integer value.
- Use option instead of setting in the user interface.
- Improve error messages for empty option values.
- Improve option descriptions and notice messages.


## 1.1.0
> - **Release Date:** 2023-12-27
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.11...1.1.0

- Add an option to show a different message when formatting makes no changes.
- Add an option to insert a newline at the end of a document.
- Divide settings into format and other groups.
- Update messages and option descriptions.


## 1.0.11
> - **Release Date:** 2023-12-12
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.10...1.0.11

- Display the correct default values in option placeholders.


## 1.0.10
> - **Release Date:** 2023-12-12
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.9...1.0.10

- Fix unexpected removal of line breaks.
- Add an icon to the Format Document command.


## 1.0.9
> - **Release Date:** 2023-12-12
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.8...1.0.9

- Remove the message delay from the ribbon action.
- Update formatting messages and project metadata.


## 1.0.8
> - **Release Date:** 2023-12-11
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.7...1.0.8

- Handle documents containing only a property section.
- Display a different message when there is nothing to format.
- Display an error message when document parsing fails.
- Validate documents before formatting.


## 1.0.7
> - **Release Date:** 2023-12-10
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.6...1.0.7

- Prevent duplicated settings sections.
- Clean up and refactor code.


## 1.0.6
> - **Release Date:** 2023-12-07
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.5...1.0.6

- Warn when formatting is attempted in reading view.
- Format headings without title text.
- Audit dependencies and improve the code structure.


## 1.0.5
> - **Release Date:** 2023-12-06
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.4...1.0.5

- Fix unexpected extra spacing before the first section.
- Rename the license file and configure ESLint.


## 1.0.4
> - **Release Date:** 2023-11-25
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.3...1.0.4

- Handle documents that start with a content section.
- Enable link-time optimization for releases.
- Improve readability, tests, documentation, and unused CSS cleanup.


## 1.0.3
> - **Release Date:** 2023-11-21
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.2...1.0.3

- Handle documents that start with a content section.
- Ignore hash symbols that are not headings.
- Update the example image.


## 1.0.2
> - **Release Date:** 2023-11-18
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.1...1.0.2

- Display a message when no editor is open.
- Remove unused imports.


## 1.0.1
> - **Release Date:** 2023-11-18
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/compare/1.0.0...1.0.1

- Handle documents without headings.
- Add ribbon and Format Document icons.
- Improve the project structure and remove unused code.


## 1.0.0
> - **Release Date:** 2023-11-15
> - **Full Changelog:** https://gitlab.com/elaraspace/formative/-/tags/1.0.0

- Initial release of the Formatto plugin.
