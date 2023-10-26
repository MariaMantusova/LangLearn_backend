import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { CardService } from "./card.service";
import { Card } from "./schemes/card.schema";

@Controller('card')
export class CardController {

  constructor(private cardService: CardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.createWord(createCardDto)
  }

  @Get()
  getCards() {
    return this.cardService.getWords()
  }

  @Get(":id")
  getCardByID(@Param('id') id: string) {
    return this.cardService.getWordById(id)
  }

  @Delete(":id")
  deleteCardByID(@Param('id') id: string) {
    return this.cardService.removeWord(id)
  }

}
