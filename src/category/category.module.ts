import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
      PrismaModule,
      JwtModule.register({
        secret: 'yourSecret',
        signOptions: { expiresIn: '1h' },
      }),
    ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
