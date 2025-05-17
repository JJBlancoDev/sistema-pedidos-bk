import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);
  logger.log(
    `Server Running on port: ${configService.getOrThrow<number>('PORT')}`,
  );
  await app.listen(configService.getOrThrow<number>('PORT'));
}
void bootstrap();
