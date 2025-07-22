import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {

  constructor(readonly prisma : PrismaService){}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.prisma.category.create({data: createCategoryDto});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

async findAll(
  name?: string,
  page?: number,
  limit?: number,
  sortOrder: 'asc' | 'desc' = 'asc',
): Promise<Category[]> {
  try {
    const take = Number(limit) || 10;
    const skip = page && page > 0 ? (page - 1) * take : 0;

    const query: any = {};
    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const data = await this.prisma.category.findMany({
      where: query,
      take,
      skip,
      orderBy: {
        name: sortOrder,
      },
    });

    return data;
  } catch (error) {
    throw new BadRequestException
  }
}


  async findOne(id: number) {
    try {
      const data = await this.prisma.category.findUnique({where: { id }});
      return data 
    } catch (error) {
      throw new BadRequestException
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const data = await this.prisma.category.update({where: { id }, data: updateCategoryDto});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.category.delete({where: { id }});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }
}
