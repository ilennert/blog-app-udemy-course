import { Component, Input } from '@angular/core';

import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'rendered-post',
  templateUrl: './rendered-post.component.html',
  styleUrls: ['./rendered-post.component.css']
})
export class RenderedPostComponent {
    @Input() post: Post;
}
