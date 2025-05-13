import type { Tag } from "./tag.type.ts";

export type Post = {
    id: number;
    json: any;
    tag: Tag[];
    tagColor: string;
    tagName: string;
    thumbnail: string;
}