import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import {
  type RehypeCodeOptions,
  rehypeCode,
  rehypeToc,
  remarkGfm,
  remarkHeading,
  remarkImage,
} from 'fumadocs-core/mdx-plugins';
import readingTime from 'reading-time';
import { sqip } from 'sqip';

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'catppuccin-mocha',
    dark: 'catppuccin-mocha',
  },
};

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string(),
    authors: z.array(z.string()),
    tags: z.array(z.string()).optional(),
  }),
  transform: async ({ title, ...page }, context) => {
    const blur = await context.cache(page._meta.path, async () =>
      sqip({
        input: `./public/${page.image}`,
        plugins: [
          'sqip-plugin-primitive',
          'sqip-plugin-svgo',
          'sqip-plugin-data-uri',
        ],
      })
    );

    const result = Array.isArray(blur) ? blur[0] : blur;

    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading, remarkImage],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions, rehypeToc]],
      })
    );

    return {
      ...page,
      _title: title,
      _slug: page._meta.path,
      readingTime: readingTime(page.content).text,
      body,

      imageMetadata: {
        image: page.image,
        height: result.metadata.height,
        width: result.metadata.width,
        imageBlur: result.metadata.dataURIBase64 as string,
      },
    };
  },
});

const legals = defineCollection({
  name: 'legal',
  directory: 'content/legal',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
  transform: async ({ title, ...page }, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading, remarkImage],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    return {
      ...page,
      _title: title,
      _slug: page._meta.path,
      readingTime: readingTime(page.content).text,
      body,
    };
  },
});

export default defineConfig({
  collections: [posts, legals],
});
