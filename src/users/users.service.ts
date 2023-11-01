import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemes/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: CreateUserDto) {
    try {
      const user = new this.userModel(userDto)
      return await user.save()
    } catch (e) {
      const errorMessage = e.errors.name ?
        e.errors.name.properties.message :
        e.errors.email ?
          e.errors.email.properties.message :
          e.errors.password ?
            e.errors.password.properties.message : e
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN)
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email } );
  }

}
