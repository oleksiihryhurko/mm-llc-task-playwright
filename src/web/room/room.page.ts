import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/base.page";
import { HeaderComponent } from "../home/components/header.component";
import { VideoPanelComponent } from "./components/video-panel.component";

export class RoomPage extends BasePage {
    protected path: string;
    private readonly videoPanelLocator: Locator;
    private readonly headerLocator: Locator;

    readonly scanCamsButton: Locator;
    readonly skipCamButton: Locator;
    readonly nextCamButton: Locator;
    readonly exitScanningButton: Locator;

    constructor(page: Page) {
        super(page);
        this.path = page.url();

        this.videoPanelLocator = this.page.locator('#VideoPanel');
        this.headerLocator = this.page.locator('#header');

        /**
         * I did not find any special attributes for these locators,
         * it would be correct to put "data-test-id" locators on these buttons
         */
        this.scanCamsButton = this.page.locator('[data-paction="NextCam"]').getByText(/SCAN CAMS/)
        this.skipCamButton = this.page.locator('[data-paction="NextCam"]').getByText(/SKIP CAM/)
        this.nextCamButton = this.page.locator('[data-paction="NextCam"]').getByText(/NEXT CAM/)
        this.exitScanningButton = this.page.locator('[data-paction="NextCam"]').getByText(/EXIT SCANNING/)
    }

    get header() {
        return new HeaderComponent(this.headerLocator);
    }

    get videoPlayer() {
        return new VideoPanelComponent(this.videoPanelLocator)
    }
}