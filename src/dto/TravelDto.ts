export class TravelDto {
  constructor(
    public description: string,
    public pointFrom: string,
    public pointTo: string,
    public image: string
  ) {
  }
}