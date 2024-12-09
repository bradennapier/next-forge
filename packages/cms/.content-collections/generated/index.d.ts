import configuration from "../../collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export type Legal = GetTypeByName<typeof configuration, "legal">;
export declare const allLegals: Array<Legal>;

export {};
