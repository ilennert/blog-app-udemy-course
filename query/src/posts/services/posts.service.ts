import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { EventsService } from 'src/events/services/events.service';
import { Post } from 'src/models/post.model';

@Injectable()
export class PostsService {
    constructor(private eventsService: EventsService) {}

    public getPosts(): Observable<Post[]> {
        const posts: Post[] = [];
        for (const key in this.eventsService.store) {
            posts.push(this.eventsService.store[key])
        }
        return of(posts);
    }
}
