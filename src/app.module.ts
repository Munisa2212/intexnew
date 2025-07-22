import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { InfoModule } from './info/info.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterController } from './multer/multer.controller';


@Module({
  imports: [ PrismaModule, AuthModule, CategoryModule, ProductModule, OrderModule, InfoModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/file'
  })],
  controllers: [AppController, MulterController],
  providers: [AppService],
})
export class AppModule {}
