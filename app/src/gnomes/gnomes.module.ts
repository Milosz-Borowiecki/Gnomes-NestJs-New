import { Module } from '@nestjs/common';
import { GnomesService } from './gnomes.service';
import { GnomesController } from './gnomes.controller';
import { Gnome } from './entities/gnome.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gnome,User])],
  providers: [GnomesService],
  controllers: [GnomesController]
})
export class GnomesModule {}
