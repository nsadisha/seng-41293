import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get mongoUrl(): string {
    return this.configService.get('MONGO_URL');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get jwtExpiration(): string {
    return this.configService.get<string>('JWT_EXPIRATION');
  }
}