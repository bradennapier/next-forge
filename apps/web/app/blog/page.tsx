import { blog } from '@repo/cms';
import type { Blog, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = createMetadata({ title, description });

const BlogIndex = async () => {
  const draft = await draftMode();

  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  const posts = await blog.getPosts();

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto flex flex-col gap-14">
          <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
              Latest articles
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            FIX ME {posts?.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
