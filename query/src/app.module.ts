import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ EventsModule, PostsModule, CommentsModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
