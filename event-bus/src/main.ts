import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(4005);
  console.log("Event-bus service, listening on port 4005");
}
bootstrap();
