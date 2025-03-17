export class UpdatePostDto {
  constructor(public description: string, public imageUrl: string) {}
  static execute(object: { [key: string]: any }): [string?, UpdatePostDto?] {
    const { description, imageUrl } = object;

    if (!description) return ['description is required'];
    if (!imageUrl) return ['image URL is required'];

    return [
      undefined,
      new UpdatePostDto(
        description.trim().toLowerCase(),
        imageUrl.trim().toLowerCase()
      ),
    ];
  }
}
