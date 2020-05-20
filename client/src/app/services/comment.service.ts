import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError as observableThrowError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Comment } from '../models/comment.model';

@Injectable({ providedIn: "root" })
export class CommentService {
    constructor(private http: HttpClient) {}

    createCommentForPost(postId: string, comment: Partial<Comment>): Observable<Comment[]> {
        const commentUrl = 'posts.com'
        return this.http
            .post<Comment[]>(`http://${commentUrl}/posts/${postId}/comments`, comment)
            .pipe(catchError((error: any) => observableThrowError(error.json())));
    }

    getCommentsByPost(postId: string): Observable<Comment[]> {
        const commentUrl = 'posts.com'
        return this.http
            .get<Comment[]>(`http://${commentUrl}/posts/${postId}/comments`)
            .pipe(catchError((error: any) => observableThrowError(error.json())));
    }
}