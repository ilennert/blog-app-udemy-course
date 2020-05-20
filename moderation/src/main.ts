import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(4003);
  console.log("Moderation service, listening on port 4003");
}
bootstrap();
