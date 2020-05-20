import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [ CommentsModule ],
  controllers: [ EventsController ]
})
export class EventsModule {}
