import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrderService {

  constructor(readonly prisma : PrismaService){}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const data = await this.prisma.order.create({data: {...createOrderDto, status: false}});
      await this.prisma.product.update({where: { id: createOrderDto.productId }, data: {count: {decrement: 1}}})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.order.findMany({include: {product: true}});
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.order.findUnique({where: { id }, include: {product: true}});
      return data
    } catch (error) {
      console.log
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const data = await this.prisma.order.update({where: { id }, data: updateOrderDto});
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.order.delete({where: { id }});
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
