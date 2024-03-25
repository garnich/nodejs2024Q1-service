export class TrackDto {
  readonly id: string;
  readonly name: string;
  readonly artistId: string | null;
  readonly albumId: string | null;
  readonly duration: number;
}
