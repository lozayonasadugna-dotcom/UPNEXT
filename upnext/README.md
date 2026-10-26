This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sign-in and profile

Email/password accounts use Supabase Auth. Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project, and enable email/password sign-in in Supabase Authentication. Add your local site URL (for example `http://localhost:3000/profile`) to the project's allowed redirect URLs, then restart the development server. The profile page works without Supabase, but its profile photo and opportunity tracking are stored only in that browser.

The six selectable profile avatars are served by DiceBear. Uploaded profile photos are resized and saved locally in the browser; they are not uploaded to Supabase Storage.

## Premium checkout

Premium subscriptions are not active by default. To show the Subscribe button, set `NEXT_PUBLIC_PREMIUM_PRICE` and `NEXT_PUBLIC_CHECKOUT_URL` in the deployment environment. The checkout URL must be an HTTPS payment-provider checkout link. Set `NEXT_PUBLIC_SUPPORT_EMAIL` to show the support contact.

The current integration only links to an external checkout page; it does not verify purchases or unlock subscriber benefits in UpNext. Do not advertise Premium as purchasable until a payment provider and subscription verification flow are configured.

## Live job listings

UpNext displays current Germany-based job listings from the [Arbeitnow public job-board API](https://www.arbeitnow.com/api/job-board-api). The API route caches the response for six hours, links each listing to Arbeitnow, and identifies the source. This is a jobs feed, not a source for scholarships, volunteer roles, competitions, courses, or other categories. The remaining development listings are illustrative samples and must be replaced with verified sources before launch.

## Organization and reviewer demos

The organization experience starts at `/for-organizations`; registration and the demo workspace are available at `/organization/register` and `/organization/dashboard`. After entering the organization demo, use the workspace sidebar to open `/organization/profile` and `/organization/analytics`. The reviewer interface is intentionally not linked from the public navigation: open `/admin/login` directly to enter the demo reviewer flow, then use `/admin` for the review dashboard.

These interfaces are front-end demonstrations, not secure accounts or real verification. Example dashboard and analytics figures are illustrative, and production reviewer access must be protected by server-side authentication, role checks, and database policies.

## Category images

Category tiles use images in `public/images/`. Add `volunteer.jpg` and `competitions.jpg` there to fill the two category images that are not currently present. The other expected filenames are `jobs.jpg`, `internships.jpg`, `scholarships.jpg`, `courses.jpg`, `grants.jpg`, `events.jpg`, and `hero.jpg`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
