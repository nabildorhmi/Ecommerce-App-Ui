export interface SiteShortLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  whatsapp_number: string;
  whatsapp_prefill_message: string;
  whatsapp_url: string;
  instagram_url: string;
  facebook_url: string;
  email: string;
  phone: string;
  address: string;
  business_hours: string;
  footer_description: string;
  home_promo_headline: string;
  short_links: SiteShortLink[];
}

export const defaultSiteSettings: SiteSettings = {
  whatsapp_number: '212600000000',
  whatsapp_prefill_message: 'Bonjour, je suis interesse(e) par vos trottinettes',
  whatsapp_url: '',
  instagram_url: '',
  facebook_url: '',
  email: 'contact@miraitech.ma',
  phone: '+212 6XX XXX XXX',
  address: '123 Bd Mohammed V, Casablanca, Maroc',
  business_hours: 'Lun-Sam: 9h - 18h',
  footer_description: '500+ clients satisfaits au Maroc. Trottinettes electriques premium avec garantie 2 ans et SAV local.',
  home_promo_headline: '',
  short_links: [
    { label: 'A propos', url: '/a-propos' },
    { label: 'Contact', url: '/contact' },
    { label: 'CGV', url: '/cgv' },
    { label: 'Mentions legales', url: '/mentions-legales' },
  ],
};

export function parseSiteSettingsContent(content?: string): SiteSettings {
  if (!content) return defaultSiteSettings;

  try {
    const parsed = JSON.parse(content) as Partial<SiteSettings>;
    return {
      ...defaultSiteSettings,
      ...parsed,
      short_links: Array.isArray(parsed.short_links)
        ? parsed.short_links.filter((item): item is SiteShortLink =>
            Boolean(item && typeof item.label === 'string' && typeof item.url === 'string')
          )
        : defaultSiteSettings.short_links,
    };
  } catch {
    return defaultSiteSettings;
  }
}
