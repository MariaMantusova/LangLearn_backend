import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    let jwt = await this.authService.login(userDto)
    res.cookie("auth-token", jwt.token, { httpOnly: true, secure: true, sameSite: "none" });
    return {
      userName: userDto.name,
      message: "Авторизация прошла успешно"
    };
  }

  @Post("/registration")
  async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    let jwt = await this.authService.createUser(userDto)
    res.cookie("auth-token", jwt.token, { httpOnly: true, secure: false, sameSite: "none" });
    return {
      userName: userDto.name,
      message: "Пользователь успешно зарегестрирован"
    };
  }
}
