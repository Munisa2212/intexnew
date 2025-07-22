import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
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
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
