import { Module } from '@nestjs/common';
import { GnomesModule } from './gnomes/gnomes.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/entities/user.entity';
import { Gnome } from './gnomes/entities/gnome.entity';
import { ImagesModule } from './images/images.module';

dotenv.config();

@Module({
  imports: [GnomesModule, UserModule, AuthModule,ImagesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User,Gnome],
      synchronize: true,
    }),
  ]
})
export class AppModule {}
