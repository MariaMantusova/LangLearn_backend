import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";
const cookieParser = require('cookie-parser')

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.use(cookieParser())
  app.use(helmet());

  await app.listen(3000);
}

bootstrap();
