import type { Post } from "./post.type.ts"; 

export type Tag = {
    id: number;
    title: string;
    color: string;
    posts: Post[];
}