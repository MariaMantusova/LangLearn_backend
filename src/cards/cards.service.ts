import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card, CardDocument } from "./schemes/card.schema";
import { Model } from "mongoose";
import { CreateCardDto } from "./dto/create-card.dto";

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async getWords(): Promise<Card[]> {
    return this.cardModel.find().exec()
  }

  async getWordById(id: string): Promise<Card> {
    return this.cardModel.findById(id)
  }

  async createWord(cardDto: CreateCardDto): Promise<Card> {
    const newWord = new this.cardModel(cardDto)
    return newWord.save()
  }

  async removeWord(id: string): Promise<Card> {
    return this.cardModel.findByIdAndRemove(id)
  }

}
