import { regularExp } from '../../../config';

export class CreatePostDto {
  constructor(
    public petName: string,
    public description: string,
    public imageUrl: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatePostDto?] {
    const { petName, description, imageUrl } = object;
    if (!petName) return ['Pet name is required'];
    if (!description) return ['description is required'];
    if (!imageUrl) return ['image URL is required '];
    if (!regularExp.imageUrlRegex.test(imageUrl)) return ['Image Url invalid'];

    return [
      undefined,
      new CreatePostDto(
        petName.trim().toLowerCase(),
        description.trim(),
        imageUrl.trim().toLowerCase()
      ),
    ];
  }
}
