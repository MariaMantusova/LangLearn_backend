import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CardsController } from "./cards.controller";
import { Card, CardSchema } from "./schemes/card.schema";
import { CardsService } from "./cards.service";

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    MongooseModule.forFeature([
      {name: Card.name, schema: CardSchema}
    ])
  ]
})

export class CardsModule {}
