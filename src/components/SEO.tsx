import { NextSeo, NextSeoProps } from 'next-seo';

const defaultMeta = {
    title: 'Kanban Board',
    siteName: 'K',
    description:
      'A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow)',
    url: 'https://kanban-salma.vercel.app/',
    type: 'website',
    robots: 'follow, index',
    image: 'https://kanban-salma.vercel.app/og.png',
  };

type SEOProps = {
    title?: string;
    description?: string;
} & NextSeoProps;

export default function SEO({ title, description, ...rest }: SEOProps) {
    return (
        <NextSeo
            title={title} 
            description={description} 
            {...rest}
            openGraph={{
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
            }}
        />
    );
}