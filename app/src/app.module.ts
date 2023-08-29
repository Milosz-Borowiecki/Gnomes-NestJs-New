import { Module } from '@nestjs/common';
import { GnomesModule } from './gnomes/gnomes.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GnomesModule, UserModule, AuthModule]
})
export class AppModule {}
