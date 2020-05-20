import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServiceEvent } from '../models/service-event.model';
import { Comment } from '../models/comment.model';
import { CommentsService } from './comments.service';

@Injectable()
export class EventsService {
    constructor(private httpService: HttpService,
                private commentsService: CommentsService) {}

    processEvent(event: ServiceEvent): Observable<ServiceEvent> {
        switch (event.type) {
            case 'CommentModerated': {
                    const postId = event.data.postId;
                    const comment: Comment = event.data as Comment;
                    const post = this.commentsService.commentsByPostId[postId];
                    const comments = post.comments.map(c => c.id === comment.id ? comment : c);
                    // update
                    this.commentsService.commentsByPostId[postId] = { ...post, comments };
                    event = {
                        type: 'CommentUpdated',
                        data: event.data
                    };
                    this.sendEvent(event);
                }
                break;
            default:
                break;
        }
        return of(event)
    }

    sendEvent(event: ServiceEvent): void {
        const eventUrl = 'http://event-bus-srv:4005/events';
        this.httpService.post(eventUrl, event)
            .pipe(catchError(err => of([])))
            .subscribe();
    }
}
