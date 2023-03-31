import { Module } from '@nestjs/common';
import { GnomesModule } from './gnomes/gnomes.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [GnomesModule, UserModule]
})
export class AppModule {}
