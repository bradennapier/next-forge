import { allLegals, allPosts } from '@/.content-collections/generated';

export const blog = {
  postsQuery: null,
  latestPostQuery: null,
  postQuery: (_slug: string) => null,
  getPosts: async () => allPosts,
  getLatestPost: async () =>
    allPosts
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .at(0),
  getPost: async (slug: string) =>
    allPosts.find(({ _meta }) => _meta.path === slug),
} as const;

export const legal = {
  postsQuery: null,
  latestPostQuery: null,
  postQuery: (_slug: string) => null,
  getPosts: async () => allLegals,
  getLatestPost: async () =>
    allLegals
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .at(0),
  getPost: async (slug: string) =>
    allLegals.find(({ _meta }) => _meta.path === slug),
} as const;
