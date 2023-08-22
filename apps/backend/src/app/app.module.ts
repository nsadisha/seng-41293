import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://backend_user:backend_password@seng-db.lfnofmf.mongodb.net/')],
})
export class AppModule {}
