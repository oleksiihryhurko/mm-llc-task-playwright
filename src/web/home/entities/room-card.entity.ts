export interface RoomCardEntity {
    ref: string,
    name: string,
    details?: {
        age: string,
        gender: string,
    },
    cams?: {
        time: string,
        viewers: string
    },
    tegs?: string[],
    location?: string,
}