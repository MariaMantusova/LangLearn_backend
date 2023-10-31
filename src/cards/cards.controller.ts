import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { CardsService } from "./cards.service";
import { Card } from "./schemes/card.schema";
import { MakeLearnedCardDto } from "./dto/make-learned-card.dto";
import { ChangeWordCardDto } from "./dto/change-word-card.dto";
import { ChangeTranslationCardDto } from "./dto/change-translation-card.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("cards")
export class CardsController {

  constructor(private cardService: CardsService) {}

  @Get("/my")
  @UseGuards(AuthGuard)
  getCardsByUserId(@Req() request) {
    return this.cardService.getWordsByUserId(request.user._id)
  }

  @Post("/create")
  @UseGuards(AuthGuard)
  createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.createWord(createCardDto)
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteCardByID(@Param('id') id: string) {
    return this.cardService.removeWord(id)
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  makeCardLearned(@Param('id') id: string, @Body() makeLearnedCardDto: MakeLearnedCardDto): Promise<Card> {
    return this.cardService.wordIsLearned(id, makeLearnedCardDto)
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  changeCardWord(@Param('id') id: string, @Body() changeCardDto: ChangeWordCardDto | ChangeTranslationCardDto): Promise<Card> {
    return this.cardService.changeCard(id, changeCardDto)
  }
}
