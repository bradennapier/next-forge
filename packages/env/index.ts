import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  /**
   * Setup / Control Variables
   */

  ANALYZE: z.string().optional(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),



  /**
   * Database
   */
  DATABASE_URL: z.string().min(1).url(),
  /**
   * Resend Setup
   */
  RESEND_FROM: z.string().min(1).email(),
  RESEND_TOKEN: z.string().min(1).startsWith('re_'),
  /**
   * Clerk / Auth
   */
  CLERK_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  CLERK_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
  /**
   * Stripe / Payments
   */
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),

  /**
   * Basehub CMS
   *
   * ### Additional Options
   *
   * - [Content Collections](https://www.content-collections.dev/)
   */
  BASEHUB_TOKEN: z.string().min(1).startsWith('bshb_pk_').optional(),

  /**
   * Betterstack (OPTIONAL)
   */
  BETTERSTACK_API_KEY: z.string().min(1).optional(),
  BETTERSTACK_URL: z.string().min(1).url().optional(),

  /**
   * Arcjet
   */
  ARCJET_KEY: z.string().min(1).startsWith('ajkey_'),

  /**
   * SVIX Webhooks
   */
  SVIX_TOKEN: z
    .string()
    .min(1)
    .startsWith('sk_')
    .or(z.string().min(1).startsWith('testsk_')),

  /**
   * LiveBlocks Collaboration (Optional)
   */
  LIVEBLOCKS_SECRET: z.string().min(1).startsWith('sk_').optional(),
  /**
   * AI Integration - OpenAI API Key (Optional)
   */
  OPENAI_API_KEY: z.string().min(1).startsWith('sk-').optional(),

  /**
   * Error Reporting (Sentry)
   */

  /**
   * - Added by Vercel during Deployments
   * - Sentry Integration, Vercel Marketplace
   */
  SENTRY_ORG: z.string().min(1).optional(),
   /**
   * - Added by Vercel during Deployments
   * - Sentry Integration, Vercel Marketplace
   */
  SENTRY_PROJECT: z.string().min(1).optional(),

  /**
   * Feature Flags (Vercel)
   *
   * Can be generated yourself using the example command in bash
   *
   * @example
   * ```sh
   * openssl rand -base64 32
   * ```
   */
  FLAGS_SECRET: z.string().min(1).optional(),


  /**
   * Added by Vercel during Deployments
   */
  VERCEL: z.string().optional(),

  BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
};

const client: Parameters<typeof createEnv>[0]['client'] = {
  /**
   * Authentication (Clerk)
   */
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
  NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
  NEXT_PUBLIC_API_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_DOCS_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).startsWith('G-').optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),

  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),

  // Added by Vercel
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    RESEND_FROM: process.env.RESEND_FROM,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ANALYZE: process.env.ANALYZE,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    VERCEL: process.env.VERCEL,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    FLAGS_SECRET: process.env.FLAGS_SECRET,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    SVIX_TOKEN: process.env.SVIX_TOKEN,
    LIVEBLOCKS_SECRET: process.env.LIVEBLOCKS_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BASEHUB_TOKEN: process.env.BASEHUB_TOKEN,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
});
