import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(@Body() userDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    let jwt = await this.authService.login(userDto);
    let userName = await this.authService.findUserName(userDto);
    return {
      success: true,
      userName: userName,
      message: "Авторизация прошла успешно",
      token: jwt.token
    };
  }

  @Post("/registration")
  async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    let jwt = await this.authService.createUser(userDto);
    return {
      success: true,
      userName: userDto.name,
      message: "Пользователь успешно зарегестрирован",
      token: jwt.token
    };
  }

  @Get("/me")
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() request) {
    return this.authService.getCurrentUser(request.user._id)
  }
}
