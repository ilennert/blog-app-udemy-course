
export interface PostContainer {
    id: string;
    comments: Comment[]
}

export interface Comment {
    id: string;
    content: string;
    status: string;
}

export const initComment: Comment = {
    id: '',
    content: '',
    status: 'pending'
}
