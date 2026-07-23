import { addIcon } from "obsidian";

import formativeLogo from "./img/formative-logo.svg";

export class FormativeIcons {
    private icons = [{ iconId: "formative-logo", svg: formativeLogo }];

    registerIcons = () => {
        this.icons.forEach(({ iconId, svg }) => {
            addIcon(iconId, svg);
        });
    };
}
