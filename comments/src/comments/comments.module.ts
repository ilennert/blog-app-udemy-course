import { Module, HttpModule } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './services/comments.service';
import { EventsService } from './services/events.service';

@Module({
    imports: [ HttpModule ],
    controllers: [ CommentsController ],
    providers: [ CommentsService, EventsService ],
    exports: [ CommentsService, EventsService ]
})
export class CommentsModule {}