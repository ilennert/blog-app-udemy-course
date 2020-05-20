
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { Guid } from 'guid-typescript';

import { Comment, PostContainer, initComment } from '../models/comment.model';
import { Dictionary } from 'src/structs/dictionary.struct';

@Injectable()
export class CommentsService {
    public readonly commentsByPostId: Dictionary<PostContainer> = new Dictionary<PostContainer>();

    public getComments(postId: string): Observable<Comment[]> {
        const post = this.commentsByPostId[postId] ? this.commentsByPostId[postId] : { id: postId, comments: [] };

        return of(post.comments);
    }

    public createComment(postId: string, content: string): Observable<Comment[]> {
        const id = Guid.create().toString();
        const comment: Comment = { ...initComment, id, content };

        const post = !!this.commentsByPostId[postId]
            ? { ...this.commentsByPostId[postId], comments: [ ...this.commentsByPostId[postId].comments, comment ] }
            : { id: postId, comments: [ comment ] };

        this.commentsByPostId[postId] = post;
        return of([ comment ]);
    }
}
