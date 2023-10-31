import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {

  }

  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()

    try {
      const token = req.cookies["auth-token"]

      if (!token) {
        throw new UnauthorizedException({message: "Пользователь не авторизован"})
      }

      const user = this.jwtService.verify(token)
      req.user = user
      return true
    } catch (e) {
      throw new UnauthorizedException({message: "Пользователь не авторизован"})
    }
  }
}
