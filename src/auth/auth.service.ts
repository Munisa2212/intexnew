import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({where: { email: createAuthDto.email }});
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
      const createdUser = await this.prisma.user.create({
        data: {
          email: createAuthDto.email,
          password: hashedPassword,
        },
      })

      return createdUser
    } catch (error) {
      throw BadRequestException
    }
  }

  async login(createAuthDto: CreateAuthDto){
    try {
      const user = await this.prisma.user.findFirst({where: { email: createAuthDto.email }});
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isMatch = await bcrypt.compare(createAuthDto.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = await this.jwtService.signAsync({ id: user.id });

      return { access_token: token };
    } catch (error) {
      throw new BadRequestException
    }
  }
  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users
    } catch (error) {
      throw new BadRequestException
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({where: { id }});
      return user
    } catch (error) {
      throw new BadRequestException
    }
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    try {
      const user = await this.prisma.user.update({where: { id }, data: updateAuthDto});
      return user
    } catch (error) {
      throw new BadRequestException
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({where: { id }});
      return user
    } catch (error) {
      throw new BadRequestException
    }
  }
}
