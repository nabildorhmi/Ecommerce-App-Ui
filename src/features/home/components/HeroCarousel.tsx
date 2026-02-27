import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { AnimatePresence, motion, useMotionValue, animate } from 'framer-motion';
import { useHeroBanners } from '../../admin/api/heroBanners';

/* ─── Progress bar that resets every slide ───────────────────────────── */
function ProgressBar({ duration, resetKey }: { duration: number; resetKey: number }) {
  const scaleX = useMotionValue(0);

  useEffect(() => {
    scaleX.set(0);
    const ctrl = animate(scaleX, 1, { duration: duration / 1000, ease: 'linear' });
    return () => ctrl.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, duration]);

  return (
    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, bgcolor: 'rgba(255,255,255,0.08)', zIndex: 5, overflow: 'hidden' }}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #00C2FF, #0099CC)',
          scaleX,
          transformOrigin: 'left',
        }}
      />
    </Box>
  );
}

/* ─── Ken-Burns zoom on active image ─────────────────────────────────── */
function SlideImage({ src, alt, duration }: { src: string; alt: string; duration: number }) {
  return (
    <motion.div
      initial={{ scale: 1.04 }}
      animate={{ scale: 1.12 }}
      transition={{ duration: duration / 1000 + 0.6, ease: 'linear' }}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  );
}

/**
 * Hero image carousel — crossfade + scale transitions, Ken-Burns zoom,
 * animated progress bar, same-tab link navigation.
 */
export function HeroCarousel() {
  const { data } = useHeroBanners();
  const banners = (data?.data ?? []).filter((b) => b.image);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const DURATION = 6000;

  const count = banners.length;

  // Auto-advance
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setResetKey((k) => k + 1);
      setDirection(1);
      setIndex((prev) => (prev + 1) % count);
    }, DURATION);
    return () => clearInterval(id);
  }, [count]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (count <= 1) return;
      setResetKey((k) => k + 1);
      setDirection(dir);
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count],
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === index) return;
      setResetKey((k) => k + 1);
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index],
  );

  if (count === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: { xs: 260, sm: 360, md: '25vh', lg: '35vh' },
          borderRadius: 3,
          bgcolor: '#0B0B0E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: 'rgba(0,194,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
          NO BANNER
        </Typography>
      </Box>
    );
  }

  const current = banners[index];

  /* Crossfade + subtle directional offset + scale */
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 45 : -45, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -45 : 45, opacity: 0, scale: 1.02 }),
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 260, sm: 360, md: '25vh', lg: '35vh' },
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.5, ease: 'easeInOut' },
            x:       { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
            scale:   { duration: 0.5, ease: 'easeInOut' },
          }}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        >
          {/* Link wrapper — same tab, no-op when link is null */}
          <Box
            component={current.link ? 'a' : 'div'}
            {...(current.link ? { href: current.link } : {})}
            sx={{
              display: 'block',
              width: '100%',
              height: '100%',
              textDecoration: 'none',
              cursor: current.link ? 'pointer' : 'default',
              position: 'absolute',
              inset: 0,
            }}
          >
            {/* Ken-Burns zoom on the image while it's active */}
            <SlideImage
              src={current.image!.hero}
              alt={current.title ?? 'Banner'}
              duration={DURATION}
            />

            {/* Dark gradient for readability */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,11,14,0.82) 0%, rgba(11,11,14,0.18) 55%, transparent 100%)',
                zIndex: 1,
              }}
            />

            {/* CRT scanline texture */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Title / subtitle / CTA hint */}
            {(current.title || current.subtitle) && (
              <Box sx={{ position: 'absolute', bottom: 46, left: 18, right: 18, zIndex: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.45 }}
                >
                  {current.title && (
                    <Typography
                      sx={{
                        fontSize: { xs: '0.92rem', md: '1.15rem' },
                        fontWeight: 800,
                        color: '#F5F7FA',
                        letterSpacing: '0.03em',
                        textShadow: '0 2px 10px rgba(0,0,0,0.75)',
                        mb: 0.4,
                        lineHeight: 1.25,
                      }}
                    >
                      {current.title}
                    </Typography>
                  )}
                  {current.subtitle && (
                    <Typography
                      sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.58)', letterSpacing: '0.07em' }}
                    >
                      {current.subtitle}
                    </Typography>
                  )}
                  {current.link && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 0.7 }}>
                      <Box sx={{ width: 16, height: 1.5, bgcolor: '#00C2FF' }} />
                      <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#00C2FF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        EXPLORER
                      </Typography>
                    </Box>
                  )}
                </motion.div>
              </Box>
            )}
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Animated bottom progress bar */}
      <ProgressBar duration={DURATION} resetKey={resetKey} />

      {/* Navigation */}
      {count > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            zIndex: 6,
          }}
        >
          <IconButton
            size="small"
            onClick={() => go(-1)}
            sx={{
              p: 0.4,
              color: 'rgba(255,255,255,0.75)',
              bgcolor: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'rgba(0,194,255,0.3)', color: '#00C2FF' },
            }}
          >
            <KeyboardArrowLeftIcon sx={{ fontSize: 16 }} />
          </IconButton>

          {banners.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === index ? 18 : 5, opacity: i === index ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
              onClick={() => goTo(i)}
              style={{
                height: 5,
                borderRadius: 3,
                backgroundColor: '#00C2FF',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
          ))}

          <IconButton
            size="small"
            onClick={() => go(1)}
            sx={{
              p: 0.4,
              color: 'rgba(255,255,255,0.75)',
              bgcolor: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'rgba(0,194,255,0.3)', color: '#00C2FF' },
            }}
          >
            <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}