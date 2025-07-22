import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { stat } from 'fs';

@Injectable()
export class ProductService {

  constructor(readonly prisma : PrismaService){}
  async create(createProductDto: CreateProductDto) {
    try {
      const category = await this.prisma.category.findUnique({where: {id: createProductDto.categoryId}});
      if(!category){
        return {message: 'Category not found'}
      }
      const one = await this.prisma.product.create({data: {
        price: createProductDto.price,
        size: createProductDto.size,
        shape: createProductDto.shape,
        status: createProductDto.status,
        count: createProductDto.count,
        discountPrice: createProductDto.discountPrice,
        categoryId: createProductDto.categoryId,
        image: createProductDto.image,
        shapeUzb: createProductDto.shapeUzb
      }});
      return one  
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(
    price?: number,
    size?: number,
    shape?: string,
    status?: string,
    count?: number,
    discountPrice?: number,
    limit?: number,
    page?: number,
    sortOrder?: 'asc' | 'desc',
    categoryId?: number
  ) {
    try {
      const take = Number(limit) || 10;
      const skip = (Number(page) - 1) * take || 0;
      const query: any = {};

      if (price) {
        query.price = +price;
      }
      if (size) {
        query.size = +size;
      }
      if (shape) {
        query.shape = shape;
      }
      if (status) {
        query.status = status;
      }
      if (count) {
        query.count = +count;
      }
      if (discountPrice) {
        query.discountPrice = +discountPrice;
      }
      if (categoryId) {
        query.categoryId = +categoryId;
      }

      const one = await this.prisma.product.findMany({
        where: query,
        take,
        skip,
        orderBy: {
          price: sortOrder
        },
        include: {Category: true}});
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
