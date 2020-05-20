import { Comment } from './comment.model';

export interface Post {
    id: string;
    title: string;
    comments: Comment[];
}

export const initPost: Post = {
    id: '',
    title: '',
    comments: []
}
