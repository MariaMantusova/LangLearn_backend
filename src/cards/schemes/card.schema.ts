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

  @Prop({required: true, minLength: 1, maxLength: 15, validate: {
      validator(v) {
        return /^[А-Яа-яЁё\s\-]+$/gm.test(v)
      },
      message: 'Введите перевод слова на русском',
    },})
  translation: string

  @Prop({required: true, default: false })
  isLearned: boolean

  @Prop({required: true})
  userId: string
}

export const CardSchema = SchemaFactory.createForClass(Card);
