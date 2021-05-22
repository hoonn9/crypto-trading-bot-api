import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: 'http://localhost:3090', credentials: true });
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  app.use(
    session({
      name: 's-sid',
      resave: true,
      saveUninitialized: true,
      secret: app.get(ConfigService).get<string>('SESSION_KEY')!,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
      },
    }),
  );

  await app.listen(app.get(ConfigService).get<string>('PORT') || 3050);
}
bootstrap();
