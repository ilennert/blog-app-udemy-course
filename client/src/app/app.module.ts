import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommentCreateComponent } from './components/comment-create/comment-create.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { RenderedPostComponent } from './components/rendered-post/rendered-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentCreateComponent,
    CommentListComponent,
    PostCreateComponent,
    PostListComponent,
    RenderedPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
