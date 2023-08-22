import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb+srv://backend_user:backend_password@seng-db.lfnofmf.mongodb.net/seng')
  ],
})
export class AppModule {}
