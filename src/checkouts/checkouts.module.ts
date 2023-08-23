import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CheckoutsService, PrismaService],
  controllers: [CheckoutsController]
})
export class CheckoutsModule {}
