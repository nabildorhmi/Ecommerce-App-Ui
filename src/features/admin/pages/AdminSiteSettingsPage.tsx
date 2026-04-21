import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuthStore } from '@/features/auth/store';
import { parseSiteSettingsContent, type ShippingPricingRule, type SiteSettings, type SiteShortLink } from '@/shared/types/siteSettings';
import { useAdminSiteSettingsPage, useUpdateAdminSiteSettingsPage } from '../api/siteSettings';

function slugifyLabel(label: string): string {
  const normalized = label
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const compact = normalized
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return compact || 'nouvelle-page';
}

function extractDynamicSlug(url: string): string | null {
  const match = url.match(/^\/pages\/([a-z0-9-]+)$/i);
  return match ? match[1].toLowerCase() : null;
}

function buildUniqueShortLinkUrl(label: string, links: SiteShortLink[], currentIndex?: number): string {
  const baseSlug = slugifyLabel(label);
  const usedSlugs = new Set(
    links
      .map((link, index) => {
        if (typeof currentIndex === 'number' && index === currentIndex) {
          return null;
        }

        return extractDynamicSlug(link.url);
      })
      .filter((slug): slug is string => Boolean(slug))
  );

  let candidate = baseSlug;
  let suffix = 2;

  while (usedSlugs.has(candidate)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return `/pages/${candidate}`;
}

function centimesToMad(centimes: number): string {
  return (Math.max(0, centimes) / 100).toFixed(2);
}

function madToCentimes(value: string): number {
  const normalized = value.replace(',', '.').trim();
  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount < 0) return 0;
  return Math.round(amount * 100);
}

function SiteSettingsForm({ initialSettings }: { initialSettings: SiteSettings }) {
  const updateMutation = useUpdateAdminSiteSettingsPage();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSettings);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSiteSettingChange = (key: keyof SiteSettings, value: string) => {
    setSiteSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleShippingFieldChange = (key: 'delivery_fee_default' | 'free_shipping_threshold', value: string) => {
    setSiteSettings((prev) => ({
      ...prev,
      [key]: madToCentimes(value),
    }));
  };

  const handleShippingRuleChange = (index: number, field: 'min_subtotal' | 'fee', value: string) => {
    setSiteSettings((prev) => {
      const nextRules = [...prev.shipping_pricing_rules];
      nextRules[index] = {
        ...nextRules[index],
        [field]: madToCentimes(value),
      };

      return {
        ...prev,
        shipping_pricing_rules: nextRules,
      };
    });
  };

  const addShippingRule = () => {
    setSiteSettings((prev) => ({
      ...prev,
      shipping_pricing_rules: [...prev.shipping_pricing_rules, { min_subtotal: 0, fee: 0 }],
    }));
  };

  const removeShippingRule = (index: number) => {
    setSiteSettings((prev) => ({
      ...prev,
      shipping_pricing_rules: prev.shipping_pricing_rules.filter((_, i) => i !== index),
    }));
  };

  const handleShortLinkLabelChange = (index: number, value: string) => {
    setSiteSettings((prev) => {
      const nextLinks = [...prev.short_links];
      const url = buildUniqueShortLinkUrl(value, nextLinks, index);

      nextLinks[index] = {
        ...nextLinks[index],
        label: value,
        url,
      };

      return {
        ...prev,
        short_links: nextLinks,
      };
    });
  };

  const addShortLink = () => {
    setSiteSettings((prev) => {
      const newUrl = buildUniqueShortLinkUrl('nouvelle-page', prev.short_links);
      return {
        ...prev,
        short_links: [...prev.short_links, { label: '', url: newUrl }],
      };
    });
  };

  const removeShortLink = (index: number) => {
    setSiteSettings((prev) => ({
      ...prev,
      short_links: prev.short_links.filter((_, i) => i !== index),
    }));
  };

  const saveSiteSettings = async () => {
    const payload = JSON.stringify(siteSettings, null, 2);
    try {
      await updateMutation.mutateAsync({
        title: 'Parametres du site',
        content: payload,
      });
      setFeedback({ type: 'success', message: 'Parametres du site enregistres.' });
    } catch {
      setFeedback({ type: 'error', message: 'Echec de l enregistrement des parametres du site.' });
    }
  };

  return (
    <>
    <Card variant="outlined">
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1.5}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Parametres de contenu du site
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organisez les informations globales du footer, des reseaux sociaux et des pages dynamiques.
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => void saveSiteSettings()}
            disabled={updateMutation.isPending}
            startIcon={updateMutation.isPending ? <CircularProgress size={16} /> : undefined}
          >
            Enregistrer
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box display="flex" flexDirection="column" gap={2}>
            <Accordion defaultExpanded disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={700}>Contact et disponibilite</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  Infos affichees dans le footer et les zones de contact.
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={1.5}>
                  <TextField label="Email contact" size="small" value={siteSettings.email} onChange={(e) => handleSiteSettingChange('email', e.target.value)} fullWidth />
                  <TextField label="Telephone" size="small" value={siteSettings.phone} onChange={(e) => handleSiteSettingChange('phone', e.target.value)} fullWidth />
                  <TextField label="Horaires" size="small" value={siteSettings.business_hours} onChange={(e) => handleSiteSettingChange('business_hours', e.target.value)} fullWidth />
                  <TextField label="Titre promo homepage (optionnel)" size="small" value={siteSettings.home_promo_headline} onChange={(e) => handleSiteSettingChange('home_promo_headline', e.target.value)} fullWidth />
                  <TextField label="Adresse" size="small" value={siteSettings.address} onChange={(e) => handleSiteSettingChange('address', e.target.value)} fullWidth multiline minRows={2} sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }} />
                  <TextField label="Description footer" size="small" value={siteSettings.footer_description} onChange={(e) => handleSiteSettingChange('footer_description', e.target.value)} fullWidth multiline minRows={2} sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }} />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={700}>WhatsApp et reseaux sociaux</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  Liens utilises pour les boutons de contact rapides.
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={1.5}>
                  <TextField label="Numero WhatsApp" size="small" value={siteSettings.whatsapp_number} onChange={(e) => handleSiteSettingChange('whatsapp_number', e.target.value)} fullWidth />
                  <TextField label="Lien WhatsApp direct (optionnel)" size="small" value={siteSettings.whatsapp_url} onChange={(e) => handleSiteSettingChange('whatsapp_url', e.target.value)} fullWidth />
                  <TextField label="Message WhatsApp par defaut" size="small" value={siteSettings.whatsapp_prefill_message} onChange={(e) => handleSiteSettingChange('whatsapp_prefill_message', e.target.value)} fullWidth sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }} />
                  <TextField label="Instagram URL" size="small" value={siteSettings.instagram_url} onChange={(e) => handleSiteSettingChange('instagram_url', e.target.value)} fullWidth />
                  <TextField label="Facebook URL" size="small" value={siteSettings.facebook_url} onChange={(e) => handleSiteSettingChange('facebook_url', e.target.value)} fullWidth />
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={700}>Frais de livraison et regles de prix</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  Configurez les frais de base, le seuil de livraison gratuite et les regles selon le montant du panier (MAD).
                </Typography>

                <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={1.5}>
                  <TextField
                    size="small"
                    label="Frais de livraison par defaut (MAD)"
                    value={centimesToMad(siteSettings.delivery_fee_default)}
                    onChange={(e) => handleShippingFieldChange('delivery_fee_default', e.target.value)}
                    type="number"
                    slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                  />
                  <TextField
                    size="small"
                    label="Livraison gratuite a partir de (MAD)"
                    value={centimesToMad(siteSettings.free_shipping_threshold)}
                    onChange={(e) => handleShippingFieldChange('free_shipping_threshold', e.target.value)}
                    type="number"
                    slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                  />
                </Box>

                <Box mt={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.25}>
                    <Typography variant="subtitle2" fontWeight={700}>Regles de tarification conditionnelle</Typography>
                    <Button size="small" variant="outlined" onClick={addShippingRule}>Ajouter une regle</Button>
                  </Box>

                  {siteSettings.shipping_pricing_rules.length === 0 ? (
                    <Alert severity="info" sx={{ py: 0.5 }}>Aucune regle conditionnelle. Le frais par defaut sera applique.</Alert>
                  ) : (
                    <Box display="flex" flexDirection="column" gap={1.25}>
                      {siteSettings.shipping_pricing_rules.map((rule: ShippingPricingRule, index: number) => (
                        <Box key={`${index}-${rule.min_subtotal}-${rule.fee}`} display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr auto' }} gap={1}>
                          <TextField
                            size="small"
                            label="Panier a partir de (MAD)"
                            value={centimesToMad(rule.min_subtotal)}
                            onChange={(e) => handleShippingRuleChange(index, 'min_subtotal', e.target.value)}
                            type="number"
                            slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                          />
                          <TextField
                            size="small"
                            label="Frais appliques (MAD)"
                            value={centimesToMad(rule.fee)}
                            onChange={(e) => handleShippingRuleChange(index, 'fee', e.target.value)}
                            type="number"
                            slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                          />
                          <Button color="error" onClick={() => removeShippingRule(index)}>Supprimer</Button>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={700}>Short links dynamiques</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="subtitle2" fontWeight={700}>Liens rapides du footer</Typography>
                  <Button size="small" variant="outlined" onClick={addShortLink}>Ajouter</Button>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  Chaque short link cree automatiquement une page markdown dynamique via /pages/slug.
                </Typography>
                <Box display="flex" flexDirection="column" gap={1.5}>
                  {siteSettings.short_links.length === 0 && (
                    <Alert severity="info" sx={{ py: 0.5 }}>Aucun short link configure pour le moment.</Alert>
                  )}
                  {siteSettings.short_links.map((link, index) => (
                    <Box key={`${index}-${link.label}`} display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr auto' }} gap={1}>
                      <TextField size="small" label="Label" value={link.label} onChange={(e) => handleShortLinkLabelChange(index, e.target.value)} />
                      <TextField size="small" label="URL (auto)" value={link.url} slotProps={{ input: { readOnly: true } }} />
                      <Button color="error" onClick={() => removeShortLink(index)}>Supprimer</Button>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
        </Box>
        </CardContent>
    </Card>

    <Snackbar
      open={Boolean(feedback)}
      autoHideDuration={3000}
      onClose={() => setFeedback(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={feedback?.type ?? 'success'} onClose={() => setFeedback(null)}>
        {feedback?.message}
      </Alert>
    </Snackbar>
    </>
  );
}

export function AdminSiteSettingsPage() {
  const user = useAuthStore((s) => s.user);
  const { data: siteSettingsPage, isLoading, error } = useAdminSiteSettingsPage();

  if (user?.role !== 'global_admin') {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Alert severity="error">Acces reserve au super admin.</Alert>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Alert severity="error">Impossible de charger les parametres du site.</Alert>
      </Container>
    );
  }

  const initialSettings = parseSiteSettingsContent(siteSettingsPage?.content);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Parametres du site
        </Typography>
      </Box>

      <SiteSettingsForm
        key={siteSettingsPage?.updated_at ?? 'site-settings-default'}
        initialSettings={initialSettings}
      />
    </Container>
  );
}
