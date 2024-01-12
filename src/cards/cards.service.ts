import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  async getWordsByUserId(userId: string, wordsType: string): Promise<Card[]> {
    switch (wordsType) {
      case "all":
        return await this.cardModel.find({ userId }).exec();
        break;
      case "learned":
        return (await this.cardModel.find({ userId }).exec())
          .filter((card) => card.isLearned);
        break;
      case "new":
        return (await this.cardModel.find({ userId }).exec())
          .filter((card) => !card.isLearned);
        break;
    }
  }

  async createWord(cardDto: CreateCardDtoWithUser): Promise<Card> {
    try {
      const newWord = new this.cardModel(cardDto)
      return await newWord.save()
    } catch (e) {
      const errorMessage = e.errors.word ?
        e.errors.word.properties.message :
        e.errors.translation ?
          e.errors.translation.properties.message : e
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST)
    }
  }

  async removeWord(id: string, userId: string): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (card) {
      if (card.userId === userId) {
        return this.cardModel.findByIdAndRemove(id);
      } else {
        throw new HttpException("Вы не можете удалять чужие карточки", HttpStatus.FORBIDDEN);
      }
    }

    throw new NotFoundException({ message: "Карточка не найдена" });
  }

  async wordIsLearned(id: string, isLearned: MakeLearnedCardDto, userId): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (card) {
      if (card.userId === userId) {
        return this.cardModel.findByIdAndUpdate(id, isLearned, { new: true });
      } else {
        throw new HttpException("Вы не можете отмечать выполненными чужие карточки", HttpStatus.FORBIDDEN);
      }
    }

    throw new NotFoundException({ message: "Карточка не найдена" });
  }

  async changeCard(id: string, card: ChangeWordCardDto | ChangeTranslationCardDto, userId): Promise<Card> {
    const cardById = await this.cardModel.findById(id);

    if (cardById) {
      if (cardById.userId === userId) {
        return this.cardModel.findByIdAndUpdate(id, card, {new: true})
      } else {
        throw new HttpException("Вы не можете исправлять чужие карточки", HttpStatus.FORBIDDEN);
      }
    }

    throw new NotFoundException({ message: "Карточка не найдена" });
  }
}
