import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { PostInfo } from '../models/post-info.model';

@Injectable({ providedIn: "root" })
export class PostService {
    constructor(private http: HttpClient) {}

    createPost(post: Partial<PostInfo>): Observable<PostInfo> {
        const postsUrl = 'http://posts.com/posts/create';
        return this.http
            .post<PostInfo>(postsUrl, post)
            .pipe(catchError((error: any) => observableThrowError(error.json())));
    }

    getPosts(): Observable<PostInfo[]> {
        const queryUrl = 'http://posts.com/posts';
        return this.http
            .get<PostInfo[]>(queryUrl)
            .pipe(catchError((error: any) => observableThrowError(error.json())));
    }
}
