import { Component, Input } from '@angular/core';

import { Comment } from '../../models/comment.model';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
    @Input('comment-list') commentList: Comment[];

    doTheRightThing(comment: Comment): string {
      return comment.status === 'approved'
        ? comment.content
        : comment.status === 'pending'
          ? 'This comment is awaiting moderation'
          : 'This comment has been rejected';
    }
}
