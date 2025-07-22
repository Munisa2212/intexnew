import { ApiProperty } from '@nestjs/swagger';


export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of the category',
  })
  name: string;
}

