import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, minLength: 3, validate: {
      validator(v) {
        return /^[А-Яа-яЁёA-Za-z\-]+$/gm.test(v)
      },
      message: 'Введите имя без пробелов и лишних символов',
    },})
  name: string

  @Prop({required: true, validate: {
      validator(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm.test(v)
      },
      message: 'Введите корректный email',
    },})
  email: string

  @Prop({required: true, minLength: 8, validate: {
      validator(v) {
        return /^[A-Za-z\d]+$/gm.test(v)
      },
      message: 'Введите корректный пароль',
    },})
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User);
