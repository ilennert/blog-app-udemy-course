import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    postForm: FormGroup;

    constructor(private formbuilder: FormBuilder,
                private postService: PostService) {
    }

    ngOnInit(): void {
        this.postForm = this.formbuilder.group({
            title: ['', Validators.required]
        });
    }

    onSubmit() {
        this.postService.createPost(this.postForm.value)
            .subscribe(() => {
                this.postForm.get('title').setValue('');
            });
    }
}
