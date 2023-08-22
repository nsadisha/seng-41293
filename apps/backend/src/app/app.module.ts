import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './app.helper';
import { AuthModule } from './auth/auth.module';

const envFilePath: string = getEnvPath(`${__dirname}/environments`);

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath }),
    // MongooseModule.forRoot('')
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL')
      })
    })
  ],
})
export class AppModule {}
