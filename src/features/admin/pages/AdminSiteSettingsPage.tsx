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
import { useAuthStore } from '@/features/auth/store';
import { parseSiteSettingsContent, type SiteSettings } from '@/shared/types/siteSettings';
import { useAdminSiteSettingsPage, useUpdateAdminSiteSettingsPage } from '../api/siteSettings';

function SiteSettingsForm({ initialSettings }: { initialSettings: SiteSettings }) {
  const updateMutation = useUpdateAdminSiteSettingsPage();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSettings);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSiteSettingChange = (key: keyof SiteSettings, value: string) => {
    setSiteSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleShortLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    setSiteSettings((prev) => ({
      ...prev,
      short_links: prev.short_links.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }));
  };

  const addShortLink = () => {
    setSiteSettings((prev) => ({
      ...prev,
      short_links: [...prev.short_links, { label: '', url: '' }],
    }));
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
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1.5}>
            <Typography variant="h6" fontWeight={700}>
              Contenu statique modifiable
            </Typography>
            <Button
              variant="contained"
              onClick={() => void saveSiteSettings()}
              disabled={updateMutation.isPending}
              startIcon={updateMutation.isPending ? <CircularProgress size={16} /> : undefined}
            >
              Enregistrer
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ces valeurs alimentent le footer, WhatsApp flottant, liens sociaux, adresse, short links et titre promo homepage.
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
            <TextField label="Numero WhatsApp" size="small" value={siteSettings.whatsapp_number} onChange={(e) => handleSiteSettingChange('whatsapp_number', e.target.value)} fullWidth />
            <TextField label="Lien WhatsApp direct (optionnel)" size="small" value={siteSettings.whatsapp_url} onChange={(e) => handleSiteSettingChange('whatsapp_url', e.target.value)} fullWidth />
            <TextField label="Message WhatsApp par defaut" size="small" value={siteSettings.whatsapp_prefill_message} onChange={(e) => handleSiteSettingChange('whatsapp_prefill_message', e.target.value)} fullWidth />
            <TextField label="Instagram URL" size="small" value={siteSettings.instagram_url} onChange={(e) => handleSiteSettingChange('instagram_url', e.target.value)} fullWidth />
            <TextField label="Facebook URL" size="small" value={siteSettings.facebook_url} onChange={(e) => handleSiteSettingChange('facebook_url', e.target.value)} fullWidth />
            <TextField label="Email contact" size="small" value={siteSettings.email} onChange={(e) => handleSiteSettingChange('email', e.target.value)} fullWidth />
            <TextField label="Telephone" size="small" value={siteSettings.phone} onChange={(e) => handleSiteSettingChange('phone', e.target.value)} fullWidth />
            <TextField label="Horaires" size="small" value={siteSettings.business_hours} onChange={(e) => handleSiteSettingChange('business_hours', e.target.value)} fullWidth />
            <TextField label="Titre promo homepage (optionnel)" size="small" value={siteSettings.home_promo_headline} onChange={(e) => handleSiteSettingChange('home_promo_headline', e.target.value)} fullWidth />
            <TextField label="Adresse" size="small" value={siteSettings.address} onChange={(e) => handleSiteSettingChange('address', e.target.value)} fullWidth multiline minRows={2} sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }} />
            <TextField label="Description footer" size="small" value={siteSettings.footer_description} onChange={(e) => handleSiteSettingChange('footer_description', e.target.value)} fullWidth multiline minRows={2} sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }} />
          </Box>

          <Box mt={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography variant="subtitle1" fontWeight={700}>Short links</Typography>
              <Button size="small" variant="outlined" onClick={addShortLink}>Ajouter</Button>
            </Box>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {siteSettings.short_links.map((link, index) => (
                <Box key={`${index}-${link.label}`} display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr auto' }} gap={1}>
                  <TextField size="small" label="Label" value={link.label} onChange={(e) => handleShortLinkChange(index, 'label', e.target.value)} />
                  <TextField size="small" label="URL" value={link.url} onChange={(e) => handleShortLinkChange(index, 'url', e.target.value)} />
                  <Button color="error" onClick={() => removeShortLink(index)}>Supprimer</Button>
                </Box>
              ))}
            </Box>
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
