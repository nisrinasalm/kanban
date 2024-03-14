// @SEE https://www.npmjs.com/package/next-seo#default-seo-configuration

import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://kanban-salma.vercel.app/',
    siteName: 'SiteName',
    images: [
      {
        url: `https://kanban-salma.vercel.app/og.png`,
        width: 1200,
        height: 630,
        alt: 'Kanban Board',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  titleTemplate: '%s | Kanban Board',
  description:
    'A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow)',
  defaultTitle: 'Kanban Board',
  additionalLinkTags: [
    {
      rel: 'png',
      href: '/favicon.ico',
    },
  ],
};

export default config;