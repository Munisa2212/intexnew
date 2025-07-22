import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
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
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
