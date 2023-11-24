import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "../users/schemes/user.schema";
import { LoginUserDto } from "../users/dto/login-user.dto";


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async createUser(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException("Пользователь с таким email существует", HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.createUser({...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  async findUserName(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    return user.name
  }

  private async generateToken(user: User | any) {
    const payload = {email: user.email, name: user.name, _id: user._id}

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto | LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email)

    if (!user) {
      throw new UnauthorizedException({message: "Некорректный email и(или) пароль"})
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password)

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: "Некорректный email и(или) пароль"})
  }
}
