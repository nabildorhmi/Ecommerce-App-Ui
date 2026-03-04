import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/111116/00C2FF?text=MiraiTech';

/**
 * MiraiTech ProductCard — premium card with shimmer, discount badge, lazy img, and low-stock indicator.
 */
export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.length > 0 ? product.images[0].card : PLACEHOLDER_IMAGE;
  const stockQty = product.stock_quantity ?? 0;
  const isLowStock = product.in_stock && stockQty > 0 && stockQty <= 5;

  // Calculate discount percentage and savings
  const discountPercent = product.is_on_sale && product.default_variant?.promo_price != null
    ? Math.round((1 - product.default_variant.promo_price / product.price) * 100)
    : 0;
  const savings = product.is_on_sale && product.default_variant?.promo_price != null
    ? product.price - product.default_variant.promo_price
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }}
      style={{ height: '100%' }}
    >
      <Box
        component={Link}
        to={`/products/${product.slug}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          textDecoration: 'none',
          backgroundColor: 'background.paper',
          backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.12))',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
          /* Shimmer sweep */
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'linear-gradient(105deg, transparent 40%, rgba(0,194,255,0.02) 45%, rgba(0,194,255,0.05) 50%, rgba(0,194,255,0.02) 55%, transparent 60%)',
            transform: 'translateX(-100%)',
            pointerEvents: 'none',
            zIndex: 2,
          },
          /* Gradient border pseudo */
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '16px',
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(0,194,255,0.3) 0%, transparent 50%, rgba(0,194,255,0.08) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 3,
          },
          '&:hover': {
            borderColor: 'transparent',
            boxShadow: '0 20px 48px rgba(0,194,255,0.08), 0 0 0 1px rgba(0,194,255,0.14)',
            '&::before': { opacity: 1 },
            '&::after': { animation: 'shimmer 0.8s ease-out forwards' },
            '& .card-img': { transform: 'scale(1.06)' },
            '& .quick-view-overlay': { opacity: 1 },
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'action.hover',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left-side badges */}
          <Stack spacing={0.5} sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
            {product.is_featured && (
              <Chip label="Vedette" size="small" sx={{ backgroundColor: 'rgba(0,194,255,0.15)', color: '#00C2FF', border: '1px solid rgba(0,194,255,0.3)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', height: 22, borderRadius: '6px' }} />
            )}
            {product.is_on_sale && (
              <Chip label="PROMO" size="small" sx={{ backgroundColor: 'rgba(217,122,80,0.18)', color: '#D97A50', border: '1px solid rgba(217,122,80,0.35)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', height: 22, borderRadius: '6px' }} />
            )}
            {product.is_new && (
              <Chip label="NOUVEAU" size="small" sx={{ backgroundColor: 'rgba(46,173,95,0.15)', color: '#2EAD5F', border: '1px solid rgba(46,173,95,0.3)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', height: 22, borderRadius: '6px' }} />
            )}
          </Stack>

          {/* Right-side badges */}
          <Stack spacing={0.5} sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1, alignItems: 'flex-end' }}>
            {/* Discount percentage badge */}
            {discountPercent > 0 && (
              <Chip
                label={`-${discountPercent}%`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(199,64,77,0.9)', color: '#fff',
                  fontSize: '0.68rem', fontWeight: 800, height: 24, borderRadius: '6px',
                  fontFamily: '"Orbitron", sans-serif',
                }}
              />
            )}
            {!product.in_stock && (
              <Chip label="Épuisé" size="small" sx={{ backgroundColor: 'rgba(199,64,77,0.15)', color: '#C7404D', border: '1px solid rgba(199,64,77,0.3)', fontSize: '0.6rem', fontWeight: 700, height: 22, borderRadius: '6px' }} />
            )}
            {isLowStock && (
              <Tooltip title={`Plus que ${stockQty} en stock !`} placement="left">
                <Chip label={`${stockQty} restants`} size="small" sx={{ backgroundColor: 'rgba(212,164,58,0.15)', color: '#D4A43A', border: '1px solid rgba(212,164,58,0.3)', fontSize: '0.58rem', fontWeight: 700, height: 22, borderRadius: '6px', cursor: 'help', animation: 'trust-pulse 3s ease-in-out infinite' }} />
              </Tooltip>
            )}
          </Stack>

          {/* Vignette */}
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(12,12,20,0.45) 110%)', pointerEvents: 'none', zIndex: 0 }} />

          {/* Quick-view overlay */}
          <Box className="quick-view-overlay" sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,194,255,0.1), transparent 55%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pb: 2,
            opacity: 0, transition: 'opacity 0.3s ease', zIndex: 1
          }}>
            <Typography sx={{
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em',
              color: '#E8ECF2', textTransform: 'uppercase',
              bgcolor: 'rgba(0,194,255,0.14)', backdropFilter: 'blur(8px)',
              px: 2, py: 0.6, borderRadius: '8px',
              border: '1px solid rgba(0,194,255,0.25)'
            }}>
              VOIR LE PRODUIT →
            </Typography>
          </Box>

          {/* Product image - proper <img> tag with lazy loading */}
          <Box
            component="img"
            className="card-img"
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            sx={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {product.category && (
              <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'primary.main', textTransform: 'uppercase', fontWeight: 700 }}>
                {product.category.name}
              </Typography>
            )}
            {/* Star rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <StarIcon sx={{ fontSize: '0.75rem', color: '#D4A43A' }} />
              <Typography sx={{ fontSize: '0.65rem', color: '#D4A43A', fontWeight: 700 }}>4.8</Typography>
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.85rem', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
            {product.name}
          </Typography>

          {/* Attributes preview */}
          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.25 }}>
              {Object.entries(product.attributes).slice(0, 3).map(([, value]) => (
                <Box key={String(value)} sx={{ fontSize: '0.68rem', color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.04)', px: 0.75, py: 0.2, borderRadius: '4px', border: '1px solid', borderColor: 'divider' }}>
                  {String(value)}
                </Box>
              ))}
            </Box>
          )}

          {/* Price + stock */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 'auto', pt: 1 }}>
            {product.is_on_sale && product.default_variant?.promo_price != null ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
                <Typography sx={{ fontSize: '0.65rem', color: 'text.disabled', textDecoration: 'line-through', fontWeight: 500 }}>
                  {formatCurrency(product.price)}
                </Typography>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', bgcolor: 'rgba(217,122,80,0.1)', border: '1px solid rgba(217,122,80,0.22)', borderRadius: '8px', px: 1.25, py: 0.35 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#D97A50', letterSpacing: '-0.02em' }}>
                    {formatCurrency(product.default_variant.promo_price)}
                  </Typography>
                </Box>
                {savings > 0 && (
                  <Typography sx={{ fontSize: '0.6rem', color: '#2EAD5F', fontWeight: 700, mt: 0.25 }}>
                    Économisez {formatCurrency(savings)}
                  </Typography>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'inline-flex', alignItems: 'center', bgcolor: 'rgba(0,194,255,0.08)', border: '1px solid rgba(0,194,255,0.2)', borderRadius: '8px', px: 1.25, py: 0.35 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#00C2FF', letterSpacing: '-0.02em' }}>
                  {formatCurrency(product.price)}
                </Typography>
              </Box>
            )}

            {/* Stock indicator */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box sx={{
                width: 7, height: 7, borderRadius: '50%',
                backgroundColor: product.in_stock ? '#2EAD5F' : '#C7404D',
                boxShadow: product.in_stock ? '0 0 8px #2EAD5F' : 'none',
                animation: product.in_stock ? 'pulse-dot 2.5s ease infinite' : 'none',
              }} />
              <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', fontWeight: 500 }}>
                {product.in_stock ? (isLowStock ? `${stockQty} restants` : 'En stock') : 'Épuisé'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
});
