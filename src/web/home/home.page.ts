import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/base.page";
import { EntranceTermsComponent } from "./components/entrance-terms.component";
import { RoomListComponent } from "./components/room-list.component";

export class HomePage extends BasePage {
    protected path = "/";
    private readonly roomListLocator: Locator;
    private readonly entranceTermsLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.roomListLocator = this.page.locator('#room_list');
        this.entranceTermsLocator = this.page.locator('#entrance_terms');
    }

    get roomList() {
        return new RoomListComponent(this.roomListLocator);
    }

    get entranceTerms() {
        return new EntranceTermsComponent(this.entranceTermsLocator);
    }
}