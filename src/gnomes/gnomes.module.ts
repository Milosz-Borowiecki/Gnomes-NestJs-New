import { Module } from '@nestjs/common';
import { GnomesService } from './gnomes.service';
import { GnomesController } from './gnomes.controller';

@Module({
  providers: [GnomesService],
  controllers: [GnomesController]
})
export class GnomesModule {}
