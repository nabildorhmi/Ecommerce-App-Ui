import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';

const CYAN = '#00C2FF';
const RED = '#E63946';

/* ─── Floating neon particle ─────────────────────────────────────────── */
function NeonDot({ x, y, size, color, delay, dur }: { x: string; y: string; size: number; color: string; delay: number; dur: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 0.7, 0.3, 0.7, 0], scale: [0.4, 1, 0.6, 1, 0.4] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─── Animated vertical neon line ────────────────────────────────────── */
function NeonLine({ x, height, color, delay, side }: { x: string; height: number; color: string; delay: number; side: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 0.5, 0.2, 0.5, 0], scaleY: [0, 1, 0.5, 1, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        [side]: x,
        top: '20%',
        width: 1,
        height,
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        transformOrigin: 'top',
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─── Speed streaks (horizontal dashes) ──────────────────────────────── */
function SpeedStreak({ y, width, delay, side }: { y: string; width: number; delay: number; side: 'left' | 'right' }) {
  const from = side === 'left' ? { x: -60, opacity: 0 } : { x: 60, opacity: 0 };
  const to = side === 'left'
    ? { x: [null, 0, 30], opacity: [0, 0.6, 0] }
    : { x: [null, 0, -30], opacity: [0, 0.6, 0] };

  return (
    <motion.div
      initial={from}
      animate={to}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        [side]: 12,
        top: y,
        width,
        height: 1,
        background: `linear-gradient(${side === 'left' ? 'to right' : 'to left'}, ${CYAN}, transparent)`,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─── Holographic ring ───────────────────────────────────────────────── */
function HoloRing({ x, y, size, color, dur, side }: { x: string; y: string; size: number; color: string; dur: number; side: 'left' | 'right' }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        [side]: x,
        top: y,
        width: size,
        height: size,
        border: `1px solid ${color}`,
        borderRadius: '50%',
        opacity: 0.15,
        pointerEvents: 'none',
      }}
    />
  );
}

/**
 * Decorative side elements for the hero section.
 * Renders absolutely-positioned futuristic + Japanese-accented animations
 * on left and right sides, leaving the centre clear for the banner carousel.
 */
export function HeroSideDecor() {
  return (
    <>
      {/* ═══════ LEFT SIDE ═══════ */}

      {/* Kanji watermark — vertical */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 28, lg: 48 },
          top: '50%',
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
          fontFamily: '"Noto Serif JP", serif',
          fontSize: { xs: '1.6rem', md: '2.4rem', lg: '3rem' },
          color: CYAN,
          letterSpacing: '0.35em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        未来電動技術
      </Typography>

      {/* Scooter silhouette — bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.06, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ position: 'absolute', left: 16, bottom: 24, pointerEvents: 'none', zIndex: 1 }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 48, md: 72, lg: 90 }, color: CYAN }} />
      </motion.div>

      {/* Neon vertical lines — left */}
      <NeonLine x="18%" height={100} color={CYAN} delay={0} side="left" />
      <NeonLine x="10%" height={70} color={RED} delay={2} side="left" />

      {/* Speed streaks — left */}
      <SpeedStreak y="30%" width={50} delay={0.5} side="left" />
      <SpeedStreak y="55%" width={38} delay={2.2} side="left" />
      <SpeedStreak y="75%" width={44} delay={3.8} side="left" />

      {/* Floating neon dots — left */}
      <NeonDot x="5%" y="25%" size={4} color={CYAN} delay={0} dur={5} />
      <NeonDot x="14%" y="60%" size={3} color={RED} delay={1.5} dur={6} />
      <NeonDot x="8%" y="80%" size={5} color={CYAN} delay={3} dur={4.5} />

      {/* Holographic ring — left */}
      <HoloRing x="3%" y="15%" size={60} color={CYAN} dur={20} side="left" />

      {/* ═══════ RIGHT SIDE ═══════ */}

      {/* Kanji watermark — vertical right */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 0.035, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 28, lg: 48 },
          top: '50%',
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
          fontFamily: '"Noto Serif JP", serif',
          fontSize: { xs: '1.3rem', md: '2rem', lg: '2.6rem' },
          color: RED,
          letterSpacing: '0.3em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        速度革命
      </Typography>

      {/* Scooter silhouette — top-right, flipped */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ position: 'absolute', right: 16, top: 20, pointerEvents: 'none', zIndex: 1 }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 40, md: 60, lg: 78 }, color: RED, transform: 'scaleX(-1)' }} />
      </motion.div>

      {/* Neon vertical lines — right */}
      <NeonLine x="18%" height={90} color={CYAN} delay={1} side="right" />
      <NeonLine x="8%" height={60} color={RED} delay={3.5} side="right" />

      {/* Speed streaks — right */}
      <SpeedStreak y="25%" width={46} delay={1.2} side="right" />
      <SpeedStreak y="50%" width={36} delay={2.8} side="right" />
      <SpeedStreak y="70%" width={54} delay={4.2} side="right" />

      {/* Floating neon dots — right */}
      <NeonDot x="6%" y="35%" size={4} color={RED} delay={0.8} dur={5.5} />
      <NeonDot x="15%" y="70%" size={3} color={CYAN} delay={2.5} dur={4} />
      <NeonDot x="10%" y="20%" size={5} color={CYAN} delay={4} dur={6} />

      {/* Holographic rings — right */}
      <HoloRing x="2%" y="65%" size={50} color={RED} dur={18} side="right" />
      <HoloRing x="12%" y="35%" size={36} color={CYAN} dur={25} side="right" />

      {/* ═══════ HORIZONTAL ACCENT LINES (top/bottom) ═══════ */}

      {/* Top scan-line */}
      <motion.div
        animate={{ opacity: [0.08, 0.2, 0.08], scaleX: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Bottom scan-line */}
      <motion.div
        animate={{ opacity: [0.06, 0.14, 0.06], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${RED}88, transparent)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  );
}
