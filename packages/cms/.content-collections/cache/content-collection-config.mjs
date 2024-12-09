// collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import {
  rehypeCode,
  remarkGfm,
  remarkHeading
} from "fumadocs-core/mdx-plugins";
import readingTime from "reading-time";
import { sqip } from "sqip";
var rehypeCodeOptions = {
  themes: {
    light: "catppuccin-mocha",
    dark: "catppuccin-mocha"
  }
};
var posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string(),
    authors: z.array(z.string()),
    tags: z.array(z.string()).optional()
  }),
  transform: async ({ title, ...page }, context) => {
    const blur = await context.cache(
      page._meta.path,
      async () => sqip({
        input: `./public/${page.image}`,
        plugins: [
          "sqip-plugin-primitive",
          "sqip-plugin-svgo",
          "sqip-plugin-data-uri"
        ]
      })
    );
    const result = Array.isArray(blur) ? blur[0] : blur;
    const body = await context.cache(
      page.content,
      async () => compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]]
      })
    );
    return {
      ...page,
      _title: title,
      _slug: page._meta.path,
      readingTime: readingTime(page.content).text,
      body,
      image: page.image,
      imageBlur: result.metadata.dataURIBase64
    };
  }
});
var legals = defineCollection({
  name: "legal",
  directory: "content/legal",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string()
  }),
  transform: async ({ title, ...page }, context) => {
    const body = await context.cache(
      page.content,
      async () => compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]]
      })
    );
    return {
      ...page,
      _title: title,
      _slug: page._meta.path,
      body
    };
  }
});
var collections_default = defineConfig({
  collections: [posts, legals]
});
export {
  collections_default as default
};
