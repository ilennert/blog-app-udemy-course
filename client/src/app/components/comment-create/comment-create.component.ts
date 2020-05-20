import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
    @Input() postId: string;
    commentForm: FormGroup;

    constructor(private formbuilder: FormBuilder,
                private commentService: CommentService) {
    }

    ngOnInit(): void {
        this.commentForm = this.formbuilder.group({
            content: ['', Validators.required]
        });
    }

    onSubmit() {
        this.commentService.createCommentForPost(this.postId, this.commentForm.value)
            .subscribe(() => {
                this.commentForm.get('content').setValue('');
            });
    }
}
