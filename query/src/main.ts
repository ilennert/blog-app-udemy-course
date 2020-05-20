import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(4002);
  console.log("Query service, listening on port 4002");
}
bootstrap();
