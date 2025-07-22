import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {

  constructor(readonly prisma : PrismaService){}
  async create(createProductDto: CreateProductDto) {
    try {
      const one = await this.prisma.product.create({data: {
        price: createProductDto.price,
        size: createProductDto.size,
        shape: createProductDto.shape,
        status: createProductDto.status,
        count: createProductDto.count,
        discountPrice: createProductDto.discountPrice,
        categoryId: createProductDto.categoryId,
        image: createProductDto.image
      }});
      return one  
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    try {
      const one = await this.prisma.product.findMany({include: {Category: true}});
      return one
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.prisma.product.findUnique({where: { id }, include: {Category: true}});
      return one
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const one = await this.prisma.product.findFirst({where: { id }});
      if(!one){
        return { message: 'Product not found' }
      }

      const data = await this.prisma.product.update({where: { id }, data: updateProductDto});
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async remove(id: number) {
    try {
      const one = await this.prisma.product.delete({where: { id }});
      return one
    } catch (error) {
      console.log(error)
    }
  }
}
