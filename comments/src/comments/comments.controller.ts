import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

import { CommentsService } from './services/comments.service';
import { Comment } from './models/comment.model';
import { EventsService } from './services/events.service';

@Controller('posts/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
              private readonly eventsService: EventsService) {}

  @Get()
  getComments(@Param() params): Observable<Comment[]> {
    const id: string = params.id;
    return this.commentsService.getComments(id);
  }

  @Post()
  postComments(@Param() params, @Body() comment: Partial<Comment>): Observable<Comment[]> {
      const id: string = params.id;
      const { content } = comment;
      return this.commentsService.createComment(id, content)
        .pipe(tap(data => {
          const d = { id: data[0].id, content: data[0].content, status: data[0].status }
          this.eventsService.sendEvent({type: 'CommentCreated', data: {id: d.id, content: d.content, status: d.status, postId: id}});
          return data;
        }));
  }
}
