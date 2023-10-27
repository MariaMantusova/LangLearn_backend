import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "../users/schemes/user.schema";


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {

  }

  async createUser(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException("Пользователь с таким email существует", HttpStatus.FORBIDDEN)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.createUser({...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = {email: user.email, name: user.name}

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
