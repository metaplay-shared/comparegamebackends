// Central SEO/AEO constants and JSON-LD builders.
// metadataBase (set in app/layout.tsx) resolves the relative paths used here
// into absolute URLs for canonicals, Open Graph, and structured data.

export const SITE_URL = 'https://comparegamebackends.com';
export const SITE_NAME = 'Compare Game Backends';
export const SITE_DESCRIPTION =
  'An open, community-maintained comparison of game backend platforms for live service games. Every feature claim links to official documentation, so you can read the facts and decide what fits your game.';

// Disclosed publisher. The site is published by Metaplay, which is one of the
// platforms compared — stated plainly here and in the structured data.
export const PUBLISHER = { name: 'Metaplay', url: 'https://metaplay.io' };

type Crumb = { name: string; path: string };

const org = {
  '@type': 'Organization',
  name: PUBLISHER.name,
  url: PUBLISHER.url,
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE_DESCRIPTION,
    publisher: org,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: org,
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// An ordered list of pages/entities. Used on listing pages so answer engines
// can read the full set of compared platforms or guides at a glance.
export function itemListSchema(
  name: string,
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}
