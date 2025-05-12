import type { Tag } from "./tag.type.ts";

export type Post = {
    id: number;
    json: any;
    tags: Tag[];
    thumbnail: string;
    tagName: string;
    
}

export type CreatePostInput = {
    content: string;
    tags: Tag[];
}

export type UpdatePostInput = {
    content?: string;
    tags?: Tag[];
    thumbnail?: string; 
  };