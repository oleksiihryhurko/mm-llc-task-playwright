import { Locator } from "@playwright/test";
import { getRandomNumber } from "../../../utils/random";
import { RoomCardComponent } from "./room-card.component";


export class RoomListComponent {
    private readonly roomLocator: Locator;

    constructor(private roomListLocator: Locator) {
        this.roomLocator = this.roomListLocator.locator(".room_list_room");
    }

    async getSpecificRoom(roomName: string): Promise<RoomCardComponent> {
        return new RoomCardComponent(this.roomLocator.filter({ hasText: roomName }));
    }

    async getRandomRoom(): Promise<RoomCardComponent> {
        const rooms = await this.roomLocator.all();
        const randomNumber = getRandomNumber(0, rooms.length - 1);
        return new RoomCardComponent(rooms[randomNumber]);
    }
}