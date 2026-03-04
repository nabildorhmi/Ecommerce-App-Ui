import { useRef } from 'react';
import { Link } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';

import { useFeaturedProducts, useProducts } from '../../catalog/api/products';
import { useCategories } from '../../catalog/api/categories';
import { ProductCard } from '../../catalog/components/ProductCard';
import { HeroSection } from '../components/HeroSection';
import { TrustBadgesSection } from '../components/TrustBadgesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

/* ════════════════════════════════════════════════════════════════════
   SECTION HEADER — matches screenshot exactly
   ════════════════════════════════════════════════════════════════════ */
interface SectionHeaderProps {
  subLabel: string;
  title: string;
  linkText?: string;
  linkTo?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

function SectionHeader({ subLabel, title, linkText, linkTo, onPrev, onNext }: SectionHeaderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, mt: { xs: 6, md: 10 } }}>
      <Box>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#00C2FF',
            textTransform: 'uppercase',
            mb: 1,
            fontFamily: '"Orbitron", sans-serif'
          }}
        >
          {subLabel}
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            color: '#F5F7FA',
            letterSpacing: '0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            fontFamily: '"Orbitron", sans-serif'
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {linkText && linkTo && (
          <Button
            component={Link}
            to={linkTo}
            endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />}
            sx={{
              color: '#00C2FF',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { background: 'transparent', color: '#F5F7FA' },
              p: 0,
              minWidth: 'auto',
              display: { xs: 'none', sm: 'inline-flex' }
            }}
          >
            {linkText}
          </Button>
        )}
        {(onPrev || onNext) && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={onPrev} sx={{ border: '1px solid rgba(0,194,255,0.2)', color: '#00C2FF', '&:hover': { bgcolor: 'rgba(0,194,255,0.1)' } }}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton onClick={onNext} sx={{ border: '1px solid rgba(0,194,255,0.2)', color: '#00C2FF', '&:hover': { bgcolor: 'rgba(0,194,255,0.1)' } }}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CATEGORIES STRIP
   ════════════════════════════════════════════════════════════════════ */
function CategoriesStrip() {
  const { data } = useCategories();
  const categories = data?.data ?? [];

  if (categories.length === 0) return null;

  return (
    <Box component="section" sx={{
      bgcolor: '#0B0B0E',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: 'linear-gradient(to right, rgba(0,194,255,0.02), transparent 30%, transparent 70%, rgba(0,194,255,0.02))',
    }}>
      <Container maxWidth="xl">
        <Box sx={{ py: 2, display: 'flex', alignItems: 'center', gap: 1.5, overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', color: '#9CA3AF', textTransform: 'uppercase', whiteSpace: 'nowrap', mr: 2, flexShrink: 0, fontFamily: '"Orbitron", sans-serif' }}>
            NOS MODÈLES
          </Typography>
          <Box sx={{ width: 1, height: 24, bgcolor: 'rgba(255,255,255,0.1)', flexShrink: 0, mr: 1 }} />

          {categories.map((cat) => (
            <Chip
              key={cat.id}
              component={Link}
              to={`/products?filter[category_id]=${cat.id}`}
              label={cat.name}
              icon={<ElectricScooterIcon sx={{ fontSize: '0.85rem !important' }} />}
              clickable
              sx={{
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em',
                color: '#9CA3AF', backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', px: 1, height: 34, flexShrink: 0,
                transition: 'all 0.3s ease',
                '&:hover': { color: '#00C2FF', borderColor: 'rgba(0,194,255,0.4)', backgroundColor: 'rgba(0,194,255,0.06)', boxShadow: '0 0 16px rgba(0,194,255,0.12)' },
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          ))}

          <Box sx={{ ml: 'auto', flexShrink: 0, pl: 2 }}>
            <Button component={Link} to="/products" size="small" sx={{ fontSize: '0.75rem', color: '#00C2FF', letterSpacing: '0.08em', fontWeight: 600 }} endIcon={<ArrowForwardIcon fontSize="small" />}>
              TOUT VOIR
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   FEATURED SECTION — Single row of best sellers
   ════════════════════════════════════════════════════════════════════ */
function FeaturedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useFeaturedProducts();
  const products = data?.data ?? [];

  if (!isLoading && products.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
  };

  return (
    <Box component="section" sx={{ bgcolor: '#0B0B0E', pt: { xs: 4, md: 6 }, pb: 4 }}>
      <Container maxWidth="xl">
        <SectionHeader
          subLabel="SÉLECTION"
          title="NOS MEILLEURES VENTES"
          linkText="Tout voir &gt;"
          linkTo="/products"
          onPrev={() => scroll('left')}
          onNext={() => scroll('right')}
        />
        {isLoading ? (
          <Box sx={{ display: 'flex', gap: 3, pb: 2 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} sx={{ flexShrink: 0, width: { xs: 260, sm: 280, md: 300 } }}>
                <Skeleton variant="rectangular" height={280} sx={{ borderRadius: '16px', mb: 2 }} />
                <Skeleton height={24} sx={{ mb: 1 }} />
                <Skeleton height={20} width="60%" />
              </Box>
            ))}
          </Box>
        ) : (
          <Box ref={scrollRef} sx={{ display: 'flex', gap: 3, overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, pb: 2 }}>
            {products.map((product) => (
              <Box key={product.id} sx={{ flexShrink: 0, width: { xs: 260, sm: 280, md: 300 } }}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   NOUVEAUTÉS SECTION
   ════════════════════════════════════════════════════════════════════ */
function NouveauteSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useProducts({ 'filter[is_new]': '1', per_page: 8 });
  const products = data?.data ?? [];

  if (!isLoading && products.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
  };

  return (
    <Box component="section" sx={{ bgcolor: '#0B0B0E', pt: 2, pb: 6 }}>
      <Container maxWidth="xl">
        <SectionHeader
          subLabel="NOUVELLE COLLECTION"
          title="NOS DÉNIERS MODÈLES"
          linkText="Tout voir &gt;"
          linkTo="/products?filter[is_new]=1"
          onPrev={() => scroll('left')}
          onNext={() => scroll('right')}
        />
        {isLoading ? (
          <Box sx={{ display: 'flex', gap: 3, pb: 2 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} sx={{ flexShrink: 0, width: { xs: 260, sm: 280, md: 300 } }}>
                <Skeleton variant="rectangular" height={280} sx={{ borderRadius: '16px', mb: 2 }} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box ref={scrollRef} sx={{ display: 'flex', gap: 3, overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, pb: 2 }}>
            {products.map((product) => (
              <Box key={product.id} sx={{ flexShrink: 0, width: { xs: 260, sm: 280, md: 300 } }}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PROMO BANNER SECTION — Exact match from screenshot 2
   ════════════════════════════════════════════════════════════════════ */
function PromoSection() {
  return (
    <Box component="section" sx={{ bgcolor: '#0B0B0E', pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            p: { xs: 4, md: 6 },
            borderRadius: '16px',
            border: '1px solid rgba(255,107,53,0.15)',
            background: 'linear-gradient(135deg, rgba(16,16,20,0.8) 0%, rgba(20,10,12,0.9) 100%)',
            boxShadow: '0 20px 40px rgba(230,57,70,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle red glow blob */}
          <Box sx={{ position: 'absolute', right: -100, top: -100, width: 300, height: 300, background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <Box sx={{ flex: 1, zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <AccessTimeIcon sx={{ fontSize: '1rem', color: '#E63946' }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: '#E63946', textTransform: 'uppercase' }}>
                OFFRE LIMITÉE
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1,
                mb: 2,
                color: '#F5F7FA',
                fontFamily: '"Orbitron", sans-serif',
                textTransform: 'uppercase',
              }}
            >
              JUSQU'À <Box component="span" sx={{ color: '#00C2FF' }}>-30%</Box>
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', color: '#9CA3AF', maxWidth: 450, lineHeight: 1.6 }}>
              Profitez de nos offres exceptionnelles sur une sélection de trottinettes électriques. Stock limité !
            </Typography>
          </Box>

          <Box sx={{ flexShrink: 0, zIndex: 1 }}>
            <Button
              component={Link}
              to="/products?filter[is_on_sale]=1"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4, py: 1.75, fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #E63946 0%, #C62828 100%)',
                color: '#fff', fontWeight: 800,
                boxShadow: '0 8px 24px rgba(230,57,70,0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF4D5A 0%, #E63946 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(230,57,70,0.5)',
                }
              }}
            >
              VOIR LES PROMOS
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   FOOTER CTA — Exact match from screenshot 2
   ════════════════════════════════════════════════════════════════════ */
function FooterCTA() {
  return (
    <Box component="section" sx={{ bgcolor: '#0B0B0E', pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 }, textAlign: 'center', position: 'relative' }}>
      <Container maxWidth="md">
        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', mb: 2, fontFamily: '"Noto Serif JP", serif', letterSpacing: '0.4em' }}>
          未来テック
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3.5rem' },
            color: '#F5F7FA',
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            mb: 3,
            textTransform: 'uppercase',
            fontFamily: '"Orbitron", sans-serif'
          }}
        >
          PRÊT À ROULER <Box component="span" sx={{ color: '#00C2FF', textShadow: '0 0 30px rgba(0,194,255,0.4)' }}>VERS L'AVENIR ?</Box>
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: '#9CA3AF', maxWidth: 600, mx: 'auto', mb: 5, lineHeight: 1.6 }}>
          Rejoignez des milliers de citadins qui ont choisi MiraiTech pour leur mobilité quotidienne.
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
          sx={{
            px: 5, py: 1.75, fontSize: '0.95rem',
            background: 'linear-gradient(135deg, #00C2FF 0%, #0099CC 100%)',
            color: '#0B0B0E', fontWeight: 800,
            boxShadow: '0 8px 24px rgba(0,194,255,0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #33CFFF 0%, #00C2FF 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(0,194,255,0.5)',
            }
          }}
        >
          EXPLORER NOTRE CATALOGUE
        </Button>
      </Container>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN HOME PAGE
   ════════════════════════════════════════════════════════════════════ */
export function HomePage() {
  return (
    <Box sx={{ bgcolor: '#0B0B0E', minHeight: '100vh' }}>
      <HeroSection />
      <CategoriesStrip />
      <TrustBadgesSection />
      <FeaturedSection />
      <NouveauteSection />
      <PromoSection />
      <TestimonialsSection />
      <FooterCTA />
    </Box>
  );
}
