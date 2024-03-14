import { NextSeo, NextSeoProps } from 'next-seo';
import config from '@/seo.config';

type SEOProps = {
  title?: string;
  description: string;
} & NextSeoProps;

export default function SEO({ title, description, ...rest }: SEOProps) {
    return (
        <NextSeo
            title={title}
            description={description}
            {...config }
            {...rest}
            openGraph={{
                type: 'website',
                url: 'https://kanban-salma.vercel.app/',
                title: 'Kanban Board',
                description:
                "A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow)",
                images: [
                {
                    url: 'https://kanban-salma.vercel.app/og-logo.png',
                    width: 1200,
                    height: 630,
                    alt: 'Kanban Board',
                },
                ],
            }}
        />
    );
}