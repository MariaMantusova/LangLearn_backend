import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CardController } from "./card.controller";
import { Card, CardSchema } from "./schemes/card.schema";
import { CardService } from "./card.service";

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [
    MongooseModule.forFeature([
      {name: Card.name, schema: CardSchema}
    ])
  ]
})

export class CardModule{}
