import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemes/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: CreateUserDto) {
    const user = new this.userModel(userDto)
    return user.save()
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email } );
  }

}
