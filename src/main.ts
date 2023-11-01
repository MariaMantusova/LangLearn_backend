import { NestFactory } from "@nestjs/core";
import * as csurf from "csurf";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());
  app.use(csurf());

  await app.listen(3000);
}

bootstrap();
