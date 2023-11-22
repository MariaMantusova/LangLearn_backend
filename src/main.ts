import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";
const cookieParser = require('cookie-parser')

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    const { origin } = req.headers;
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
    const requestHeaders = req.headers["access-control-request-headers"];

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");

    if (method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
      res.header("Access-Control-Allow-Headers", requestHeaders);
      return res.end();
    }

    return next();
  });
  app.use(cookieParser())
  app.use(helmet());

  await app.listen(3000);
}

bootstrap();
