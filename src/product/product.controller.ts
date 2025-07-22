import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiQuery({ name: 'price', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'shape', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'count', required: false, type: Number })
  @ApiQuery({ name: 'discountPrice', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'sortOrder', required: false, type: String })
  @ApiQuery({name: "categoryId", required: false, type: Number})
  async findAll(
      @Query('price') price: number,
      @Query('size') size: number,
      @Query('shape') shape: string,
      @Query('status') status: string,
      @Query('count') count: number,
      @Query('discountPrice') discountPrice: number,
      @Query('limit') limit: number,
      @Query('page') page: number,
      @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
      @Query('categoryId') categoryId: number
  ) {
    return this.productService.findAll(price, size, shape, status, count, discountPrice, limit, page, sortOrder, categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
