
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { Guid } from 'guid-typescript';

import { Dictionary } from 'src/structs/dictionary.struct';
import { PostInfo } from '../models/post.model';

@Injectable()
export class PostsService {
    private posts: Dictionary<PostInfo> = new Dictionary<PostInfo>();

    public getPosts(): Observable<PostInfo[]> {
        const posts: PostInfo[] = [];
        for (const key in this.posts) {
            posts.push(this.posts[key])
        }
        return of(posts);
    }

    public createPost(title: string): Observable<PostInfo> {
        const id = Guid.create().toString();
        const post: PostInfo = { id, title };
        this.posts[id] = post;
        return of(post);
    }
}
