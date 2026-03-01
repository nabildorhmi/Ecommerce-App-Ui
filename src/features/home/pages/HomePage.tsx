import { useRef } from 'react';
import { Link } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import { useFeaturedProducts } from '../../catalog/api/products';
import { useCategories } from '../../catalog/api/categories';
import type { Product } from '../../catalog/types';
import { ProductCard } from '../../catalog/components/ProductCard';
import { HeroCarousel } from '../components/HeroCarousel';
import { HeroSideDecor } from '../components/HeroSideDecor';

/* ════════════════════════════════════════════════════════════════════
   HERO BANNER — Immersive full-screen with animated orbs & stats
   ════════════════════════════════════════════════════════════════════ */
function HeroBanner() {


  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        py: { xs: 1, md: 2 },
        overflow: 'hidden',
      }}
    >
      {/* Futuristic / Japanese side decorations */}
      <HeroSideDecor />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <HeroCarousel />
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CATEGORIES STRIP — Pill-style interactive chips
   ════════════════════════════════════════════════════════════════════ */
function CategoriesStrip() {
  const { data } = useCategories();
  const categories = data?.data ?? [];

  if (categories.length === 0) return null;

  return (
    <Box component="section" sx={{
      bgcolor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
      background: (theme) => theme.palette.mode === 'dark'
        ? 'linear-gradient(to right, rgba(0,194,255,0.02), transparent 30%, transparent 70%, rgba(0,194,255,0.02))'
        : 'background.paper',
    }}>
      <Container maxWidth="xl">
        <Box sx={{ py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5, overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'text.secondary', textTransform: 'uppercase', whiteSpace: 'nowrap', mr: 2, flexShrink: 0 }}>
            NOS MODÈLES
          </Typography>
          <Box sx={{ width: 1, height: 24, bgcolor: 'divider', flexShrink: 0, mr: 1 }} />

          {categories.map((cat) => (
            <Chip
              key={cat.id}
              component={Link}
              to={`/products?filter[category_id]=${cat.id}`}
              label={cat.name}
              icon={<ElectricScooterIcon sx={{ fontSize: '0.85rem !important' }} />}
              clickable
              sx={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'text.secondary',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'divider',
                borderRadius: '20px',
                px: 1,
                height: 34,
                flexShrink: 0,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#00C2FF',
                  borderColor: 'rgba(0,194,255,0.4)',
                  backgroundColor: 'rgba(0,194,255,0.06)',
                  boxShadow: '0 0 16px rgba(0,194,255,0.12)',
                },
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          ))}

          <Box sx={{ ml: 'auto', flexShrink: 0, pl: 2 }}>
            <Button component={Link} to="/products" size="small" sx={{ fontSize: '0.68rem', color: 'primary.main', letterSpacing: '0.08em' }} endIcon={<KeyboardArrowRightIcon fontSize="small" />}>
              TOUT VOIR
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CATEGORY FEATURED ROW — Horizontal scrolling product cards
   ════════════════════════════════════════════════════════════════════ */
interface CategoryFeaturedRowProps {
  categoryId: number;
  categoryName: string;
  products: Product[];
}

function CategoryFeaturedRow({ categoryId, categoryName, products }: CategoryFeaturedRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Section header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 4, height: 24, background: 'linear-gradient(to bottom, #00C2FF, #0099CC)', borderRadius: 2, boxShadow: '0 0 12px rgba(0,194,255,0.3)' }} />
          <Box>
            <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.25em', color: 'primary.main', fontWeight: 600, textTransform: 'uppercase', mb: 0.5 }}>
              精選モデル — HANDPICKED
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.35rem' }, color: 'text.primary', letterSpacing: '-0.01em', lineHeight: 1 }}>
              NOS {categoryName.toUpperCase()} EN VEDETTE
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={1}>
          {['left', 'right'].map((dir) => (
            <IconButton
              key={dir}
              onClick={() => scroll(dir as 'left' | 'right')}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'divider',
                color: 'text.secondary',
                width: 36, height: 36,
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'rgba(0,194,255,0.07)', boxShadow: '0 0 12px rgba(0,194,255,0.15)' }
              }}
            >
              {dir === 'left' ? <KeyboardArrowLeftIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </IconButton>
          ))}
        </Stack>
      </Box>

      {/* Scrollable product cards */}
      <Box
        ref={scrollRef}
        sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, pb: 1 }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ flexShrink: 0, width: { xs: 200, sm: 220, md: 240 } }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      {/* Per-category button */}
      <Box sx={{ textAlign: 'center', mt: 2.5 }}>
        <Button
          component={Link}
          to={`/products?filter[category_id]=${categoryId}`}
          variant="outlined"
          sx={{ px: 5, py: 1.25, fontSize: '0.78rem', letterSpacing: '0.1em' }}
        >
          VOIR TOUS LES MODÈLES
        </Button>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   FEATURED SECTION — Products grouped by category
   ════════════════════════════════════════════════════════════════════ */
function FeaturedSection() {
  const { data, isLoading } = useFeaturedProducts();
  const products = data?.data ?? [];

  const categoryGroups = products.reduce((acc, product) => {
    const categoryId = product.category?.id ?? 0;
    const categoryName = product.category?.name ?? 'Autres';

    if (!acc.has(categoryId)) {
      acc.set(categoryId, { categoryName, products: [] });
    }
    acc.get(categoryId)!.products.push(product);

    return acc;
  }, new Map<number, { categoryName: string; products: Product[] }>());

  return (
    <Box component="section" sx={{ bgcolor: 'background.default', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        {isLoading ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Skeleton width={4} height={28} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width={200} height={16} sx={{ mb: 0.5 }} />
                <Skeleton width={300} height={28} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, pb: 1 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} sx={{ flexShrink: 0, width: { xs: 220, sm: 250, md: 270 } }}>
                  <Skeleton variant="rectangular" height={220} sx={{ borderRadius: '14px', mb: 1.5 }} />
                  <Skeleton height={22} sx={{ mb: 0.5 }} />
                  <Skeleton height={18} width="55%" />
                </Box>
              ))}
            </Box>
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center', width: '100%' }}>
            <ElectricScooterIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
              No featured products yet. Toggle products in the admin panel.
            </Typography>
          </Box>
        ) : (
          <>
            {Array.from(categoryGroups.entries()).map(([categoryId, { categoryName, products: categoryProducts }]) => (
              categoryProducts.length > 0 && (
                <CategoryFeaturedRow
                  key={categoryId}
                  categoryId={categoryId}
                  categoryName={categoryName}
                  products={categoryProducts}
                />
              )
            ))}
          </>
        )}
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PROMO BANNERS — Animated gradient borders & pulse effects
   ════════════════════════════════════════════════════════════════════ */
function PromoBanners() {
  const banners = [
    { label: 'NOUVELLE COLLECTION', title: 'Scooters Urbains', sub: 'Conçus pour la ville, pensés pour vous', accent: '#00C2FF', bg: 'linear-gradient(135deg, #0d1a24 0%, #0B0B0E 100%)' },
    { label: 'BEST SELLER', title: 'Prix Imbattables', sub: 'Livraison rapide partout au Maroc', accent: '#E63946', bg: 'linear-gradient(135deg, #1a0d0e 0%, #0B0B0E 100%)' },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          {banners.map(({ label, title, sub, accent, bg }) => (
            <Box
              key={title}
              component={Link}
              to="/products"
              sx={{
                display: 'block',
                textDecoration: 'none',
                borderRadius: '18px',
                border: '1px solid',
                borderColor: `${accent}25`,
                animation: 'border-glow 4s ease-in-out infinite',
                overflow: 'hidden',
                background: bg,
                backdropFilter: 'blur(12px)',
                p: { xs: 2.5, md: 3.5 },
                position: 'relative',
                minHeight: 140,
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, transparent 30%, ${accent}15 100%)`,
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                },
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 20px 50px ${accent}25`,
                  borderColor: `${accent}50`,
                  '&::before': { opacity: 1 },
                },
              }}
            >
              {/* Decorative glow */}
              <Box sx={{ position: 'absolute', bottom: -20, right: -20, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
              {/* Scooter watermark */}
              <ElectricScooterIcon sx={{ position: 'absolute', right: 30, bottom: 20, fontSize: 120, color: accent, opacity: 0.04, transform: 'rotate(-15deg)' }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: accent, animation: 'pulse-dot 2s ease infinite' }} />
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', color: accent, textTransform: 'uppercase' }}>{label}</Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.45rem' }, color: '#F5F7FA', lineHeight: 1.15, mb: 0.75, textTransform: 'uppercase' }}>{title}</Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#9CA3AF', mb: 3, maxWidth: 280 }}>{sub}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Découvrir</Typography>
                <KeyboardArrowRightIcon sx={{ fontSize: '1rem', color: accent, transition: 'transform 0.3s', '.MuiBox-root:hover &': { transform: 'translateX(4px)' } }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN HOME PAGE
   ════════════════════════════════════════════════════════════════════ */
export function HomePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <HeroBanner />
      <CategoriesStrip />
      <FeaturedSection />
      <PromoBanners />
    </Box>
  );
}
