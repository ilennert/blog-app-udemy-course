import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Post } from 'src/models/post.model';
import { PostsService } from './services/posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    getPosts(): Observable<Post[]> {
      return this.postsService.getPosts();
    }

}
