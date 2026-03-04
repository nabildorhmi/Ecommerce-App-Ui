import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router';
import { useCategories } from '@/features/catalog/api/categories';
import miraiLogo from '@/assets/miraiTech-Logo.png';

const socialLinks = [
  { label: 'Instagram', href: '#', icon: '📸' },
  { label: 'Facebook', href: '#', icon: '🔵' },
  { label: 'WhatsApp', href: '#', icon: '💬' },
];

const trustBadges = [
  { icon: '🔒', label: 'Paiement Sécurisé', sub: 'Données protégées' },
  { icon: '🚀', label: 'Livraison Express', sub: '2-5 jours ouvrés' },
  { icon: '🛡️', label: 'Garantie 2 Ans', sub: 'Sur tous nos produits' },
  { icon: '↩️', label: 'Retour Facile', sub: '30 jours offerts' },
];

/**
 * MiraiTech Footer — dark, minimal, Japanese-inspired with trust badges.
 */
export function Footer() {
  const { data } = useCategories();
  const categories = data?.data ?? [];
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0B0B0E',
        mt: 'auto',
        pt: 0,
        pb: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,194,255,0.012) 2px, rgba(0,194,255,0.012) 4px)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Gradient top border */}
      <Box sx={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, #E63946 20%, #00C2FF 50%, #0099CC 80%, transparent 100%)', mb: 0, position: 'relative', zIndex: 1, boxShadow: '0 0 12px rgba(0,194,255,0.3)' }} />

      {/* Trust badges strip */}
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', py: 3, position: 'relative', zIndex: 1, mb: 5 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 2, md: 3 } }}>
            {trustBadges.map(({ icon, label, sub }) => (
              <Box key={label} className="mirai-trust-badge" sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, cursor: 'default' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>{icon}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#F5F7FA', letterSpacing: '0.02em' }}>{label}</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.68rem', color: '#9CA3AF', ml: 0.5 }}>{sub}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ mb: 5 }}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src={miraiLogo}
                alt="MiraiTech"
                sx={{ height: 35, width: 'auto' }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#9CA3AF', lineHeight: 1.8, maxWidth: 300, mb: 2 }}>
              L'avenir de la mobilité urbaine. Scooters électriques premium conçus pour la performance et le style.
            </Typography>
            <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 300, mb: 3 }}>
              📍 123 Bd Mohammed V, Casablanca, Maroc
            </Typography>

            {/* Social links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map(({ label, href }) => (
                <Box
                  key={label}
                  component="a"
                  href={href}
                  sx={{
                    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#9CA3AF', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em',
                    textDecoration: 'none', transition: 'all 0.3s ease',
                    '&:hover': { borderColor: 'rgba(0,194,255,0.4)', color: '#00C2FF', background: 'rgba(0,194,255,0.06)', boxShadow: '0 0 12px rgba(0,194,255,0.15)' },
                  }}
                >
                  {label[0]}
                </Box>
              ))}
            </Box>

            {/* Japanese accent */}
            <Typography
              sx={{
                fontFamily: '"Noto Serif JP", serif',
                fontSize: '0.82rem',
                color: 'rgba(0,194,255,0.12)',
                letterSpacing: '0.25em',
                mt: 2.5,
              }}
            >
              ミライテック — 未来の技術
            </Typography>
          </Grid>

          {/* Products Column */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00C2FF', textTransform: 'uppercase', mb: 2 }}>
              Produits
            </Typography>
            <Stack spacing={1.25}>
              <Box component={Link} to="/products" sx={{ fontSize: '0.82rem', color: '#9CA3AF', textDecoration: 'none', transition: 'all 0.25s ease', '&:hover': { color: '#00C2FF', transform: 'translateX(4px)', display: 'inline-block' } }}>
                Tous les produits
              </Box>
              {categories.map((cat) => (
                <Box key={cat.id} component={Link} to={`/products?filter[category_id]=${cat.id}`} sx={{ fontSize: '0.82rem', color: '#9CA3AF', textDecoration: 'none', transition: 'all 0.25s ease', '&:hover': { color: '#00C2FF', transform: 'translateX(4px)', display: 'inline-block' } }}>
                  {cat.name}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Company Column */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00C2FF', textTransform: 'uppercase', mb: 2 }}>
              Société
            </Typography>
            <Stack spacing={1.25}>
              {[
                { to: '/a-propos', label: 'À propos' },
                { to: '/contact', label: 'Contact' },
                { to: '/cgv', label: 'CGV' },
                { to: '/mentions-legales', label: 'Mentions légales' },
              ].map(({ to, label }) => (
                <Box key={to} component={Link} to={to} sx={{ fontSize: '0.82rem', color: '#9CA3AF', textDecoration: 'none', transition: 'all 0.25s ease', '&:hover': { color: '#00C2FF', transform: 'translateX(4px)', display: 'inline-block' } }}>
                  {label}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact/Support Column */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: '#00C2FF', textTransform: 'uppercase', mb: 2 }}>
              Contact
            </Typography>
            <Stack spacing={1.25}>
              <Typography sx={{ fontSize: '0.82rem', color: '#9CA3AF', lineHeight: 1.6 }}>
                📞 +212 6XX XXX XXX
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: '#9CA3AF', lineHeight: 1.6 }}>
                ✉️ contact@miraitech.ma
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: '#9CA3AF', lineHeight: 1.6 }}>
                🕒 Lun-Sam: 9h – 18h
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#1E1E28', mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Typography sx={{ fontSize: '0.72rem', color: '#6B7280' }}>
            © {new Date().getFullYear()} MiraiTech. Tous droits réservés.
          </Typography>
          {/* Payment icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {['💳 Visa', '💳 MC', '💰 COD'].map((pm) => (
              <Box key={pm} sx={{ px: 1.5, py: 0.5, border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', fontSize: '0.65rem', color: '#6B7280', fontWeight: 600, letterSpacing: '0.04em' }}>
                {pm}
              </Box>
            ))}
          </Box>
          <Typography sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: '0.75rem', color: 'rgba(0,194,255,0.12)', letterSpacing: '0.15em' }}>
            未来の移動 · FUTURE MOBILITY
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
