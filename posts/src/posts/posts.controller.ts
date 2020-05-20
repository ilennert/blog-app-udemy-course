import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

import { PostsService } from './services/posts.service';
import { PostInfo } from './models/post.model';
import { EventsService } from './services/events.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,
              private readonly eventsService: EventsService) {}

  @Get()
  getPosts(): Observable<PostInfo[]> {
    return this.postsService.getPosts();
  }

  @Post('create')
  postPostInfo(@Body() post: Partial<PostInfo>): Observable<PostInfo> {
      const { title } = post;
      return this.postsService.createPost(title)
        .pipe(tap(data => {
          this.eventsService.sendEvent({type:'PostCreated', data});
          return data;
        }));
  }
}
