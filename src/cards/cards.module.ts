import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CardsController } from "./cards.controller";
import { Card, CardSchema } from "./schemes/card.schema";
import { CardsService } from "./cards.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {name: Card.name, schema: CardSchema}
    ])
  ],
  exports: [
    AuthModule
  ]
})

export class CardsModule {}
