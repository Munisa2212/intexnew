import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the customer placing the order',
  })
  userName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the customer',
  })
  userPhone: string;

  @ApiProperty({
    example: '45 Example Street, Tashkent, Uzbekistan',
    description: 'Delivery address for the order',
  })
  userAddress: string;

  @ApiProperty({
    example: 101,
    description: 'ID of the product being ordered',
  })
  productId: number;
}

