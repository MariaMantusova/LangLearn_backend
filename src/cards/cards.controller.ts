import {
  Body,
  Controller,
  Delete,
  Get,
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

  @Get("/my/:type")
  @UseGuards(AuthGuard)
  getCardsByUserId(@Param('type') type: string, @Req() request) {
    return this.cardService.getWordsByUserId(request.user._id, type)
  }

  @Post("/create")
  @UseGuards(AuthGuard)
  createCard(@Body() createCardDto: CreateCardDto, @Req() request): Promise<Card> {
    return this.cardService.createWord({ ...createCardDto, userId: request.user._id })
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteCardByID(@Param('id') id: string, @Req() request) {
    return this.cardService.removeWord(id, request.user._id)
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  makeCardLearned(@Param('id') id: string, @Body() makeLearnedCardDto: MakeLearnedCardDto, @Req() request): Promise<Card> {
    return this.cardService.wordIsLearned(id, makeLearnedCardDto, request.user._id)
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  changeCardWord(@Param('id') id: string, @Body() changeCardDto: ChangeWordCardDto | ChangeTranslationCardDto, @Req() request): Promise<Card> {
    return this.cardService.changeCard(id, changeCardDto, request.user._id)
  }
}
