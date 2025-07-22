import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConsultationService {

  constructor(
    readonly prisma: PrismaService
  ) {}

  async create(createConsultationDto: CreateConsultationDto) {
    try {
      const time = new Date().toString()
      const data = await this.prisma.consultation.create({data: {...createConsultationDto, time, status: false}});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async findAll(
    name: string,
    limit: number,
    page: number
  ) {
    try {
      const take = Number(limit) || 10;
      const skip = (Number(page) - 1) * take || 0;
      const query: any = {};

      if (name) {
        query.name = {
          contains: name,
          mode: 'insensitive',
        }
      }
      const data = await this.prisma.consultation.findMany({
        where: query,
        take,
        skip
      });
      return data
    } catch (error) {
      console.log(error)
      throw new BadRequestException
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.consultation.findUnique({where: { id }});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async update(id: number, updateConsultationDto: UpdateConsultationDto) {
    try {
      const data = await this.prisma.consultation.update({where: { id }, data: updateConsultationDto});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.consultation.delete({where: { id }});
      return data
    } catch (error) {
      throw new BadRequestException
    }
  }
}
