import { Module } from '@nestjs/common';
import { GnomesService } from './gnomes.service';
import { GnomesController } from './gnomes.controller';
import { Gnome } from './entities/gnome.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Gnome])],
  providers: [GnomesService],
  controllers: [GnomesController]
})
export class GnomesModule {}
