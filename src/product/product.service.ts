import { BadRequestException, Injectable } from '@nestjs/common';
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
        throw new BadRequestException('Category not found')
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
      throw new BadRequestException
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
        query.price = {
          contains: +price,
          mode: 'insensitive',
        };
      }
      if (size) {
        query.size = {
          contains: +size,
          mode: 'insensitive',
        };
      }
      if (shape) {
        query.shape = {
          contains: shape,
          mode: 'insensitive',
        };
      }
      if (status) {
        query.status = {
          contains: status,
          mode: 'insensitive',
        }
      }
      if (count) {
        query.count = {
          contains: +count,
          mode: 'insensitive',
        }
      }
      if (discountPrice) {
        query.discountPrice = {
          contains: +discountPrice,
          mode: 'insensitive',
        }
      }
      if (categoryId) {
        query.categoryId = {
          contains: categoryId,
          mode: 'insensitive',
        }
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
      throw new BadRequestException
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.prisma.product.findUnique({where: { id }, include: {Category: true}});
      return one
    } catch (error) {
      throw new BadRequestException
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const one = await this.prisma.product.findFirst({where: { id }});
      if(!one){
        throw new BadRequestException('Product not found')
      }

      const data = await this.prisma.product.update({where: { id }, data: updateProductDto});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async remove(id: number) {
    try {
      const one = await this.prisma.product.delete({where: { id }});
      return one
    } catch (error) {
      throw new BadRequestException
    }
  }
}
