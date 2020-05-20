import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [ EventsModule ],
  controllers: [ PostsController ],
  providers: [ PostsService ]
})
export class PostsModule {}
