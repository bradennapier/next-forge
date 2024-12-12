import { Sidebar } from '@/components/sidebar';
import { blog } from '@/content';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Body } from '@repo/cms/components/body';
import { TableOfContents } from '@repo/cms/components/toc';
import { env } from '@repo/env';
import { JsonLd } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type BlogPostProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: BlogPostProperties): Promise<Metadata> => {
  const { slug } = await params;
  const post = await blog.getPost(slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post._title,
    description: post.description,
    image: post.image,
  });
};

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = await blog.getPosts();

  return posts.map(({ _slug }) => ({ slug: _slug }));
};

const BlogPost = async ({ params }: BlogPostProperties) => {
  const { slug } = await params;
  const page = await blog.getPost(slug);

  const draft = await draftMode();

  if (!page) {
    notFound();
  }

  return (
    <>
      <JsonLd
        code={{
          '@type': 'BlogPosting',
          '@context': 'https://schema.org',
          datePublished: page.date,
          description: page.description,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': new URL(
              `/blog/${slug}`,
              env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
            ).toString(),
          },
          headline: page._title,
          image: page.image,
          dateModified: page.date,
          author: page.authors.at(0),
          isAccessibleForFree: true,
        }}
      />
      <div className="container py-16">
        <Link
          className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
          href="/blog"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Blog
        </Link>
        <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
          <div className="sm:flex-1">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
                <Balancer>{page._title}</Balancer>
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                <Balancer>{page.description}</Balancer>
              </p>
              {page.image ? (
                <Image
                  src={page.image}
                  width={page.imageMetadata.width}
                  height={page.imageMetadata.height}
                  alt={page._title ?? ''}
                  className="my-16 h-full w-full rounded-xl"
                  priority
                />
              ) : undefined}
              <div className="mx-auto max-w-prose">
                <Body content={page.body} />
              </div>
            </div>
          </div>
          <div className="sticky top-24 hidden shrink-0 md:block">
            <Sidebar
              toc={<TableOfContents data={page.content} />}
              readingTime={`${page.readingTime} min read`}
              date={new Date(page.date)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
