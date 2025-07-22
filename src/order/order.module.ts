import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
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
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
