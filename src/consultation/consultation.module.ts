import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
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
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
