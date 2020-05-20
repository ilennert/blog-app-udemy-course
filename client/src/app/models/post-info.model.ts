import { Comment } from './comment.model';

export interface PostInfo {
    id: string;
    title: string;
    comments?: Comment[]
}
