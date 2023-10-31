import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({required: true, minLength: 1, maxLength: 15, validate: {
      validator(v) {
        return /^[A-Za-z\s\-]+$/gm.test(v)
      },
      message: 'Введите слово на английском',
    },})
  word: string

  @Prop({required: true, minLength: 1, maxLength: 15})
  translation: string

  @Prop({required: true})
  isLearned: boolean

  @Prop({required: true})
  userId: string
}

export const CardSchema = SchemaFactory.createForClass(Card);
