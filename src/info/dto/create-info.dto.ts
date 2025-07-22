import { ApiProperty } from '@nestjs/swagger';

export class CreateInfoDto {
  @ApiProperty({
    example: '+998901234567',
    description: 'Contact phone number',
  })
  phone: string;

  @ApiProperty({
    example: '123 Main Street, Tashkent, Uzbekistan',
    description: 'Physical address of the business',
  })
  address: string;

  @ApiProperty({
    example: '09:00 - 18:00',
    description: 'Working hours',
  })
  time: string;

  @ApiProperty({
    example: 'https://t.me/your_channel',
    description: 'Telegram link',
  })
  telegram_link: string;

  @ApiProperty({
    example: 'https://instagram.com/your_profile',
    description: 'Instagram link',
  })
  instagram_link: string;
}
