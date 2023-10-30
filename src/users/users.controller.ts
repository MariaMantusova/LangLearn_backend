import { Body, Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/by-email")
  getUserByEmail(@Body() email: any) {
    return this.usersService.getUserByEmail(email.email)
  }
}
