import type { Tag } from "./tag.type.ts";

export type Post = {
    id: number;
    content: string;
    tags: Tag[];
}

export type CreatePostInput = {
    content: string;
    tags: Tag[];
}

export type UpdatePostInput = {
    content?: string;
    tags: Tag[];
}