import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop()
  word: string

  @Prop()
  translation: string

  @Prop()
  isLearned: boolean

  @Prop()
  userId: string
}

export const CardSchema = SchemaFactory.createForClass(Card);
