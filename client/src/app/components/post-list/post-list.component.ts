import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { PostService } from 'src/app/services/post.service';
import { PostInfo } from '../../models/post-info.model';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    postList$: Observable<PostInfo[]>;

    constructor(private postService: PostService) {
        this.postList$ = this.postService.getPosts();
    }
}
