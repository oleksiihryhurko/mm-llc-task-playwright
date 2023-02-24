import { Locator } from "@playwright/test";

export class HeaderComponent {
    readonly signUpButton: Locator;

    constructor(private headerLocator: Locator) {
        this.signUpButton = this.headerLocator.locator(".creat");
    }
}