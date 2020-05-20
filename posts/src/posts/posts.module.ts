import { Module, HttpModule } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { EventsService } from './services/events.service';

@Module({
    imports: [ HttpModule ],
    controllers: [ PostsController ],
    providers: [ PostsService, EventsService ]
})
export class PostsModule {}