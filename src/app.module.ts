import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { InfoModule } from './info/info.module';


@Module({
  imports: [ PrismaModule, AuthModule, CategoryModule, ProductModule, OrderModule, InfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
