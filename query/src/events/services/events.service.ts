import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dictionary } from 'src/structs/dictionary.struct';
import { initPost, Post } from 'src/models/post.model'
import { ServiceEvent } from 'src/models/service-event.model';
import { Comment } from 'src/models/comment.model';

@Injectable()
export class EventsService {
    public readonly store: Dictionary<Post> = new Dictionary<Post>();

    constructor(private httpService: HttpService) {}

    requestMissedEvents(): Observable<ServiceEvent[]> {
        const eventUrl = 'http://event-bus-srv:4005/events';
        return this.httpService.get(eventUrl)
            .pipe(map(res => {
                return res.data as ServiceEvent[];
            }));
    }

    processEvent(event: ServiceEvent): Observable<any> {
        switch (event.type) {
            case 'PostCreated': {
                    const postId = event.data.id;
                    if (!postId) {
                        throw new Error(`Error processing event '${event.type}', no postId`);
                    }
                    const post = !!this.store[postId]
                        ? { ...this.store[postId], ...event.data }
                        : { ...initPost, ...event.data };
        
                    this.store[postId] = post;
                }
                break;
            case 'CommentCreated': {
                    const postId = event.data.postId;
                    if (!postId) {
                        throw new Error(`Error processing event '${event.type}', no postId`);
                    }
                    if (!this.store[postId]) {
                        throw new Error(`Error processing event '${event.type}', no post record for comment`);
                    }
                    const comment = this.commentCopy(event.data);
                    const post = { ...this.store[postId], comments: [ ...this.store[postId].comments, comment ]};
        
                    this.store[postId] = post;
                }
                break;
            case 'CommentUpdated': {
                    const postId = event.data.postId;
                    if (!postId) {
                        throw new Error(`Error processing event '${event.type}', no postId`);
                    }
                    if (!this.store[postId]) {
                        throw new Error(`Error processing event '${event.type}', no post record for comment`);
                    }
                    const comment = this.commentCopy(event.data);
                    const post = this.store[postId];
                    const comments = post.comments.map(c => c.id === comment.id ? comment : c);
                    // update
                    this.store[postId] = { ...post, comments };
                }
                break;
        }
        return of(event.data)
    }

    private commentCopy(comment: Comment): Comment {
        return {
            id: comment.id,
            content: comment.content,
            status: comment.status
        };
    }
}
