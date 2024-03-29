import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: "secret_key_safasf",
      signOptions: {
        expiresIn: "24h",
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})

export class AuthModule {}
