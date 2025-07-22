import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 150000,
    description: 'Price of the product in UZS',
  })
  price: number;

  @ApiProperty({
    example: 42,
    description: 'Size or dimension of the product (e.g., shoe size, volume in cm, etc.)',
  })
  size: number;

  @ApiProperty({
    example: 'Rectangle',
    description: 'Shape of the product (e.g., round, square, rectangle)',
  })
  shape: string;

  @ApiProperty({
    example: 'Rectangle',
    description: 'Shape of the product in Uzbek (e.g., round, square, rectangle)',
  })
  shapeUzb: string;

  @ApiProperty({
    example: 'Available',
    description: 'Current status of the product (e.g., Available, Out of Stock)',
  })
  status: string;

  @ApiProperty({
    example: 10,
    description: 'Total number of items available in stock',
  })
  count: number;

  @ApiProperty({
    example: 120000,
    description: 'Discounted price if applicable, otherwise same as price',
  })
  discountPrice: number;

  @ApiProperty({
    example: 3,
    description: 'ID of the category this product belongs to',
  })
  categoryId: number;

  @ApiProperty({
    example: 'https://example.com/images/product1.jpg',
    description: 'Image URL or path for the product',
  })
  image: string;
}
