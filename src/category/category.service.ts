import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

  constructor(readonly prisma : PrismaService){}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.prisma.category.create({data: createCategoryDto});
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(
    name?: string,
    page?: number,
    limit?: number,
    sortOrder?: 'asc' | 'desc',
  ) {
    try {
      const take = Number(limit) || 10;
      const skip = (Number(page) - 1) * take || 0;
      const query: any = {};

      if (name) {
        query.name = name;
      }

      const data = await this.prisma.category.findMany({
        where: query,
        take,
        skip,
        orderBy: {
          name: sortOrder,
        },
      });
      
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.category.findUnique({where: { id }});
      return data 
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const data = await this.prisma.category.update({where: { id }, data: updateCategoryDto});
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.category.delete({where: { id }});
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
