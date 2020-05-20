import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(4001);
  console.log("Comment service, listening on port 4001");
}
bootstrap();
