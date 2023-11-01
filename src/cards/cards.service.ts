import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card, CardDocument } from "./schemes/card.schema";
import { Model } from "mongoose";
import { MakeLearnedCardDto } from "./dto/make-learned-card.dto";
import { ChangeWordCardDto } from "./dto/change-word-card.dto";
import { ChangeTranslationCardDto } from "./dto/change-translation-card.dto";
import { CreateCardDtoWithUser } from "./dto/create-card-with-user.dto";

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async getWordsByUserId(userId: string): Promise<Card[]> {
    return this.cardModel.find({userId}).exec()
  }

  async createWord(cardDto: CreateCardDtoWithUser): Promise<Card> {
    const newWord = new this.cardModel(cardDto)
    return newWord.save()
  }

  async removeWord(id: string): Promise<Card> {
    if (await this.cardModel.findById(id)) {
      return this.cardModel.findByIdAndRemove(id);
    }

    throw new NotFoundException({ message: "Карточка не найдена" });
  }

  async wordIsLearned(id: string, isLearned: MakeLearnedCardDto): Promise<Card> {
    if (await this.cardModel.findById(id)) {
      return this.cardModel.findByIdAndUpdate(id, isLearned, { new: true });
    }

    throw new NotFoundException({ message: "Карточка не найдена" });
  }

  async changeCard(id: string, card: ChangeWordCardDto | ChangeTranslationCardDto): Promise<Card> {
    if (await this.cardModel.findById(id)) {
      return this.cardModel.findByIdAndUpdate(id, card, {new: true})
    }

    throw new NotFoundException({ message: "Карточка не найдена" });
  }
}
