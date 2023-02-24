import { Locator } from "@playwright/test";

export class ShowBuyBoxComponent {
    readonly balanceLocator: Locator;
    readonly sendTipButton: Locator;

    constructor(private showBuyBoxLocator: Locator) {
        this.balanceLocator = this.showBuyBoxLocator.locator('.currentBalance');
        this.sendTipButton = this.showBuyBoxLocator.locator('[title="SEND TIP"]');
    }
}