import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from "./cards/cards.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mariamantusova:120903mmA@learnlang.s1byrbr.mongodb.net/?retryWrites=true&w=majority'),
    CardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
