import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './config.helper';
import { AppConfigService } from './config.service';

const envFilePath: string = getEnvPath(`${__dirname}/environments`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule {}