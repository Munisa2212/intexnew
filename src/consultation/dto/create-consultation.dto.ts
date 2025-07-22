import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultationDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the person requesting consultation',
  })
  name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the person requesting consultation',
  })
  number: string;
}

