export class UpdateTrackDto {
    readonly name: string;
    readonly artistId: string | null; // refers to Artist
    readonly albumId: string | null; // refers to Album
    readonly duration: number;
}
