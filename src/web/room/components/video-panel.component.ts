import { Locator } from "@playwright/test";
import { HttpStatus } from "../../../api/common/http.common";
import config from "../../../config/app.config";
import { ShowBuyBoxComponent } from "./show-buy-box.component";

export class VideoPanelComponent {
    private readonly showBuyBoxLocator: Locator;

    constructor(private videoPanelLocator: Locator) {
        this.showBuyBoxLocator = this.videoPanelLocator.locator('[data-paction="CurrentShowBuyBox"]')
    }

    async isVideoPlaying() {
        const page = this.videoPanelLocator.page();
        const response = await page.waitForResponse(config.streamingUrl + "/stream**")
        return response.status() === HttpStatus.OK;
    }

    get showBuyBox() {
        return new ShowBuyBoxComponent(this.showBuyBoxLocator);
    }
}