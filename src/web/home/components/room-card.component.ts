import { Locator } from "@playwright/test";
import { RoomPage } from "../../room/room.page";
import { RoomCardEntity } from "../entities/room-card.entity";

export class RoomCardComponent {
    private readonly title: Locator;
    private readonly subject: Locator;
    private readonly subInfo: Locator;

    constructor(private roomLocator: Locator) {
        const details = this.roomLocator.locator(".details");
        this.title = details.locator(".title");
        this.subject = details.locator(".subject");
        this.subInfo = details.locator(".sub-info");
    }

    async visitRoom(): Promise<RoomPage> {
        await this.title.click();
        return new RoomPage(this.roomLocator.page());
    }

    async getAllDetails(): Promise<RoomCardEntity> {
        const [name, ref, age, gender] = await Promise.all([
            this.getName(),
            this.getReference(),
            this.getAge(),
            this.getGender()
        ])
        return { name, ref, details: { age, gender } }
    }

    async getName(): Promise<string> {
        return await this.title.locator('a').getAttribute("data-room") ?? "";
    }

    async getReference(): Promise<string> {
        return await this.title.locator('a').getAttribute("href") ?? "";
    }

    async getAge(): Promise<string> {
        return await this.title.locator('.age').textContent() ?? "";
    }

    async getGender(): Promise<string> {
        return await this.title.locator('.genderf').getAttribute("title") ?? "";
    }
}