import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfoService {

  constructor(private readonly prisma : PrismaService){}

  async create(createInfoDto: CreateInfoDto) {
    try {
      const data = await this.prisma.webSite.create({data: createInfoDto});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.webSite.findMany();
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.webSite.findUnique({where: { id }});
      return data
    } catch (error) {
       throw new BadRequestException
    }
  }

  async update(id: number, updateInfoDto: UpdateInfoDto) {
    try {
      const data = await this.prisma.webSite.update({where: { id }, data: updateInfoDto});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.webSite.delete({where: { id }});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }
}
