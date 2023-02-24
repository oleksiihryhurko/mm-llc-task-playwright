import { Locator } from "@playwright/test";

export class EntranceTermsComponent {
    readonly agreeButton: Locator;
    constructor(private entranceTermsLocator: Locator) {
        this.agreeButton = this.entranceTermsLocator.locator("#close_entrance_terms");
    }
}