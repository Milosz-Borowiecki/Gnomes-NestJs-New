import { Module } from '@nestjs/common';
import { GnomesModule } from './gnomes/gnomes.module';

@Module({
  imports: [GnomesModule]
})
export class AppModule {}
