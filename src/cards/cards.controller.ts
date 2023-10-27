import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { CardsService } from "./cards.service";
import { Card } from "./schemes/card.schema";
import { MakeLearnedCardDto } from "./dto/make-learned-card.dto";
import { ChangeWordCardDto } from "./dto/change-word-card.dto";
import { ChangeTranslationCardDto } from "./dto/change-translation-card.dto";

@Controller('cards')
export class CardsController {

  constructor(private cardService: CardsService) {}

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

  @Patch(":id")
  makeCardLearned(@Param('id') id: string, @Body() makeLearnedCardDto: MakeLearnedCardDto): Promise<Card> {
    return this.cardService.wordIsLearned(id, makeLearnedCardDto)
  }

  @Patch(":id")
  changeCardWord(@Param('id') id: string, @Body() changeWordCardDto: ChangeWordCardDto): Promise<Card> {
    return this.cardService.changeWord(id, changeWordCardDto)
  }

  @Patch(":id")
  changeCardTranslation(@Param('id') id: string, @Body() changeTranslationCardDto: ChangeTranslationCardDto): Promise<Card> {
    return this.cardService.changeTranslation(id, changeTranslationCardDto)
  }
}
