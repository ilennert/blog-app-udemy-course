import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServiceEvent } from 'src/models/service-event.model';
import { Comment } from 'src/models/comment.model';

@Injectable()
export class EventsService {
    constructor(private httpService: HttpService) {}

    processEvent(event: ServiceEvent): Observable<ServiceEvent> {
        const eventUrl = 'http://event-bus-srv:4005/events';
        switch (event.type) {
            case 'CommentCreated': {
                    const postId = event.data.postId;
                    const comment: Comment = event.data as Comment;
                    const status = comment.content.includes('orange') ? 'rejected' : 'approved';
                    event = {
                        type: 'CommentModerated',
                        data: { ...comment, status, postId}
                    };
                    this.httpService.post(eventUrl, event)
                        .pipe(catchError(err => of([])))
                        .subscribe();
                    }
                break;
            default:
                break;
        }
        return of(event)
    }
}
