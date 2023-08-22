import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://backend_user:backend_password@seng-db.lfnofmf.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
