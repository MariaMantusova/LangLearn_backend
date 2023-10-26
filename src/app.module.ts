import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from "./card/card.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mariamantusova:120903mmA@learnlang.s1byrbr.mongodb.net/?retryWrites=true&w=majority'),
    CardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
