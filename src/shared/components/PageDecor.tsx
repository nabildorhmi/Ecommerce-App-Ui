import { motion } from 'framer-motion';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';

const CYAN = '#00C2FF';
const RED  = '#E63946';

/* ─── Reusable primitives ─────────────────────────────────────────── */

function NeonDot({ x, y, size, color, delay, dur, side }: {
  x: string; y: string; size: number; color: string; delay: number; dur: number; side?: 'left' | 'right';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 0.65, 0.25, 0.65, 0], scale: [0.4, 1, 0.6, 1, 0.4] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        ...(side === 'right' ? { right: x } : { left: x }),
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

function NeonLine({ x, height, color, delay, side }: {
  x: string; height: number; color: string; delay: number; side: 'left' | 'right';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 0.45, 0.15, 0.45, 0], scaleY: [0, 1, 0.5, 1, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        [side]: x,
        top: '15%',
        width: 1,
        height,
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        transformOrigin: 'top',
        pointerEvents: 'none',
      }}
    />
  );
}

function SpeedStreak({ y, width, delay, side }: {
  y: string; width: number; delay: number; side: 'left' | 'right';
}) {
  const from = side === 'left' ? { x: -50, opacity: 0 } : { x: 50, opacity: 0 };
  const to   = side === 'left'
    ? { x: [null, 0, 25], opacity: [0, 0.55, 0] }
    : { x: [null, 0, -25], opacity: [0, 0.55, 0] };

  return (
    <motion.div
      initial={from}
      animate={to}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        [side]: 10,
        top: y,
        width,
        height: 1,
        background: `linear-gradient(${side === 'left' ? 'to right' : 'to left'}, ${CYAN}, transparent)`,
        pointerEvents: 'none',
      }}
    />
  );
}

function HoloRing({ x, y, size, color, dur, side }: {
  x: string; y: string; size: number; color: string; dur: number; side: 'left' | 'right';
}) {
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
        opacity: 0.12,
        pointerEvents: 'none',
      }}
    />
  );
}

function ScanLine({ pos, color, delay }: { pos: 'top' | 'bottom'; color: string; delay: number }) {
  return (
    <motion.div
      animate={{ opacity: [0.06, 0.18, 0.06], scaleX: [0.65, 1, 0.65] }}
      transition={{ duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        [pos]: 0,
        left: '8%',
        right: '8%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

/* ─── Presets ──────────────────────────────────────────────────────── */

type Variant = 'catalog' | 'productDetail' | 'checkout' | 'orders' | 'auth' | 'info';

interface PageDecorProps {
  /** Controls which set of decorations are shown */
  variant: Variant;
}

/**
 * Futuristic + Japanese-accented page decorations.
 * Parent must have `position: relative; overflow: hidden;`.
 */
export function PageDecor({ variant }: PageDecorProps) {
  switch (variant) {
    case 'catalog':       return <CatalogDecor />;
    case 'productDetail': return <ProductDetailDecor />;
    case 'checkout':      return <CheckoutDecor />;
    case 'orders':        return <OrdersDecor />;
    case 'auth':          return <AuthDecor />;
    case 'info':          return <InfoDecor />;
  }
}

/* ────────────────────── Catalog page decorations ─────────────────── */
function CatalogDecor() {
  return (
    <>
      {/* ── Left column ── */}
      <NeonLine x="3%" height={120} color={CYAN} delay={0} side="left" />
      <NeonLine x="6%" height={80}  color={RED}  delay={2.5} side="left" />

      <SpeedStreak y="18%" width={42} delay={0.4} side="left" />
      <SpeedStreak y="48%" width={34} delay={2}   side="left" />
      <SpeedStreak y="78%" width={48} delay={3.6} side="left" />

      <NeonDot x="2%"  y="28%" size={4} color={CYAN} delay={0}   dur={5}   side="left" />
      <NeonDot x="5%"  y="62%" size={3} color={RED}  delay={1.8} dur={5.5} side="left" />
      <NeonDot x="1%"  y="85%" size={5} color={CYAN} delay={3.2} dur={4.5} side="left" />

      <HoloRing x="1%" y="12%" size={54} color={CYAN} dur={22} side="left" />

      {/* Scooter silhouette — bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 0.045, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ position: 'absolute', left: 10, bottom: 40, pointerEvents: 'none' }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 36, md: 56, lg: 70 }, color: CYAN }} />
      </motion.div>

      {/* ── Right column ── */}
      <NeonLine x="3%" height={100} color={CYAN} delay={1}   side="right" />
      <NeonLine x="7%" height={60}  color={RED}  delay={3.5} side="right" />

      <SpeedStreak y="22%" width={40} delay={1}   side="right" />
      <SpeedStreak y="55%" width={30} delay={2.6} side="right" />
      <SpeedStreak y="82%" width={46} delay={4}   side="right" />

      <NeonDot x="3%"  y="32%" size={4} color={RED}  delay={0.6} dur={5}   side="right" />
      <NeonDot x="6%"  y="68%" size={3} color={CYAN} delay={2.2} dur={4.5} side="right" />
      <NeonDot x="2%"  y="15%" size={4} color={CYAN} delay={4}   dur={6}   side="right" />

      <HoloRing x="1%" y="60%" size={46} color={RED}  dur={19} side="right" />
      <HoloRing x="5%" y="30%" size={32} color={CYAN} dur={26} side="right" />

      {/* Scooter silhouette — top-right, flipped */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        style={{ position: 'absolute', right: 10, top: 30, pointerEvents: 'none' }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 30, md: 48, lg: 60 }, color: RED, transform: 'scaleX(-1)' }} />
      </motion.div>

      {/* Horizontal scan-lines */}
      <ScanLine pos="top"    color={CYAN}      delay={0} />
      <ScanLine pos="bottom" color={`${RED}88`} delay={1.2} />
    </>
  );
}

/* ────────────────── Product detail page decorations ──────────────── */
function ProductDetailDecor() {
  return (
    <>
      {/* ── Left edge ── */}
      <NeonLine x="2%" height={90}  color={CYAN} delay={0.2} side="left" />
      <NeonLine x="4%" height={55}  color={RED}  delay={3}   side="left" />

      <SpeedStreak y="25%" width={36} delay={0.6} side="left" />
      <SpeedStreak y="60%" width={28} delay={2.4} side="left" />

      <NeonDot x="1.5%" y="20%" size={4} color={CYAN} delay={0}   dur={5.5} side="left" />
      <NeonDot x="3%"   y="55%" size={3} color={RED}  delay={2}   dur={5}   side="left" />
      <NeonDot x="1%"   y="80%" size={4} color={CYAN} delay={3.5} dur={4.5} side="left" />

      <HoloRing x="0.5%" y="10%" size={44} color={CYAN} dur={24} side="left" />

      {/* ── Right edge ── */}
      <NeonLine x="2%" height={80}  color={CYAN} delay={1}   side="right" />
      <NeonLine x="5%" height={50}  color={RED}  delay={3.8} side="right" />

      <SpeedStreak y="30%" width={34} delay={1.2} side="right" />
      <SpeedStreak y="70%" width={40} delay={3}   side="right" />

      <NeonDot x="2%"  y="35%" size={3} color={RED}  delay={0.8} dur={5}   side="right" />
      <NeonDot x="4%"  y="65%" size={4} color={CYAN} delay={2.8} dur={4.5} side="right" />
      <NeonDot x="1%"  y="90%" size={3} color={CYAN} delay={4.2} dur={6}   side="right" />

      <HoloRing x="1%" y="55%" size={38} color={RED}  dur={20} side="right" />
      <HoloRing x="3%" y="25%" size={28} color={CYAN} dur={28} side="right" />

      {/* Scooter accent — bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.04, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ position: 'absolute', right: 12, bottom: 50, pointerEvents: 'none' }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 28, md: 44, lg: 56 }, color: RED, transform: 'scaleX(-1)' }} />
      </motion.div>

      {/* Horizontal scan-lines */}
      <ScanLine pos="top"    color={CYAN}      delay={0} />
      <ScanLine pos="bottom" color={`${RED}88`} delay={1.5} />
    </>
  );
}

/* ────────────────────── Checkout page decorations ────────────────── */
function CheckoutDecor() {
  return (
    <>
      {/* ── Left ── */}
      <NeonLine x="2.5%" height={100} color={CYAN} delay={0}   side="left" />
      <NeonLine x="5%"  height={60}  color={RED}  delay={2.8} side="left" />

      <SpeedStreak y="20%" width={38} delay={0.5} side="left" />
      <SpeedStreak y="55%" width={30} delay={2.2} side="left" />
      <SpeedStreak y="85%" width={44} delay={3.8} side="left" />

      <NeonDot x="2%"  y="25%" size={4} color={CYAN} delay={0}   dur={5}   side="left" />
      <NeonDot x="4%"  y="60%" size={3} color={RED}  delay={1.5} dur={5.5} side="left" />
      <NeonDot x="1%"  y="82%" size={4} color={CYAN} delay={3}   dur={4.5} side="left" />

      <HoloRing x="1%" y="8%"  size={48} color={CYAN} dur={23} side="left" />

      {/* Scooter — bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ position: 'absolute', left: 10, bottom: 35, pointerEvents: 'none' }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 32, md: 50, lg: 64 }, color: CYAN }} />
      </motion.div>

      {/* ── Right ── */}
      <NeonLine x="2.5%" height={90}  color={CYAN} delay={1.2} side="right" />
      <NeonLine x="6%"  height={55}  color={RED}  delay={3.5} side="right" />

      <SpeedStreak y="25%" width={36} delay={1}   side="right" />
      <SpeedStreak y="60%" width={28} delay={2.8} side="right" />
      <SpeedStreak y="88%" width={42} delay={4.2} side="right" />

      <NeonDot x="3%"  y="30%" size={3} color={RED}  delay={0.7} dur={5}   side="right" />
      <NeonDot x="5%"  y="65%" size={4} color={CYAN} delay={2.4} dur={4.5} side="right" />
      <NeonDot x="1%"  y="18%" size={3} color={CYAN} delay={3.8} dur={6}   side="right" />

      <HoloRing x="1.5%" y="55%" size={40} color={RED}  dur={20} side="right" />
      <HoloRing x="4%"   y="28%" size={30} color={CYAN} dur={26} side="right" />

      <ScanLine pos="top"    color={CYAN}      delay={0} />
      <ScanLine pos="bottom" color={`${RED}88`} delay={1.3} />
    </>
  );
}

/* ────────────────────── Orders page decorations ──────────────────── */
function OrdersDecor() {
  return (
    <>
      {/* ── Left ── */}
      <NeonLine x="3%" height={110} color={CYAN} delay={0.3} side="left" />
      <NeonLine x="5.5%" height={65} color={RED} delay={2.6} side="left" />

      <SpeedStreak y="15%" width={40} delay={0.3} side="left" />
      <SpeedStreak y="50%" width={32} delay={1.8} side="left" />
      <SpeedStreak y="80%" width={46} delay={3.4} side="left" />

      <NeonDot x="1.5%" y="22%" size={4} color={CYAN} delay={0}   dur={5.5} side="left" />
      <NeonDot x="4%"   y="58%" size={3} color={RED}  delay={1.6} dur={5}   side="left" />
      <NeonDot x="2%"   y="88%" size={5} color={CYAN} delay={3.4} dur={4.5} side="left" />

      <HoloRing x="0.8%" y="10%" size={50} color={CYAN} dur={24} side="left" />

      {/* ── Right ── */}
      <NeonLine x="3%" height={95} color={CYAN} delay={0.8} side="right" />
      <NeonLine x="6%" height={50} color={RED}  delay={3.2} side="right" />

      <SpeedStreak y="20%" width={38} delay={0.8} side="right" />
      <SpeedStreak y="55%" width={34} delay={2.5} side="right" />
      <SpeedStreak y="85%" width={44} delay={4.1} side="right" />

      <NeonDot x="2%"  y="28%" size={3} color={RED}  delay={0.5} dur={5}   side="right" />
      <NeonDot x="5%"  y="70%" size={4} color={CYAN} delay={2}   dur={4.5} side="right" />
      <NeonDot x="1%"  y="12%" size={3} color={CYAN} delay={3.6} dur={6}   side="right" />

      <HoloRing x="1%" y="58%" size={42} color={RED}  dur={21} side="right" />
      <HoloRing x="4%" y="24%" size={34} color={CYAN} dur={27} side="right" />

      {/* Scooter — top-right flipped */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ position: 'absolute', right: 10, top: 28, pointerEvents: 'none' }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 28, md: 44, lg: 56 }, color: RED, transform: 'scaleX(-1)' }} />
      </motion.div>

      <ScanLine pos="top"    color={CYAN}      delay={0} />
      <ScanLine pos="bottom" color={`${RED}88`} delay={1.4} />
    </>
  );
}

/* ────────────────────── Auth page decorations ────────────────────── */
function AuthDecor() {
  return (
    <>
      {/* ── Left ── */}
      <NeonLine x="4%" height={80}  color={CYAN} delay={0}   side="left" />
      <NeonLine x="7%" height={50}  color={RED}  delay={2.5} side="left" />

      <SpeedStreak y="30%" width={34} delay={0.6} side="left" />
      <SpeedStreak y="65%" width={28} delay={2.4} side="left" />

      <NeonDot x="3%"  y="20%" size={3} color={CYAN} delay={0}   dur={5.5} side="left" />
      <NeonDot x="5%"  y="55%" size={4} color={RED}  delay={2}   dur={5}   side="left" />
      <NeonDot x="2%"  y="82%" size={3} color={CYAN} delay={3.5} dur={4.5} side="left" />

      <HoloRing x="2%" y="15%" size={40} color={CYAN} dur={24} side="left" />

      {/* ── Right ── */}
      <NeonLine x="4%" height={75}  color={CYAN} delay={1}   side="right" />
      <NeonLine x="6%" height={45}  color={RED}  delay={3.2} side="right" />

      <SpeedStreak y="35%" width={32} delay={1.2} side="right" />
      <SpeedStreak y="70%" width={36} delay={3}   side="right" />

      <NeonDot x="3%"  y="25%" size={4} color={RED}  delay={0.8} dur={5}   side="right" />
      <NeonDot x="6%"  y="60%" size={3} color={CYAN} delay={2.6} dur={4.5} side="right" />
      <NeonDot x="2%"  y="88%" size={3} color={CYAN} delay={4}   dur={6}   side="right" />

      <HoloRing x="2%" y="60%" size={34} color={RED}  dur={20} side="right" />
      <HoloRing x="5%" y="35%" size={26} color={CYAN} dur={28} side="right" />

      <ScanLine pos="top"    color={CYAN}      delay={0} />
      <ScanLine pos="bottom" color={`${RED}88`} delay={1.2} />
    </>
  );
}

/* ────────────────────── Info page decorations ────────────────────── */
function InfoDecor() {
  return (
    <>
      {/* ── Left ── */}
      <NeonLine x="2%" height={90}  color={CYAN} delay={0.2} side="left" />
      <NeonLine x="4.5%" height={55} color={RED} delay={2.8} side="left" />

      <SpeedStreak y="22%" width={36} delay={0.4} side="left" />
      <SpeedStreak y="52%" width={30} delay={2}   side="left" />
      <SpeedStreak y="78%" width={42} delay={3.6} side="left" />

      <NeonDot x="1.5%" y="18%" size={4} color={CYAN} delay={0}   dur={5.5} side="left" />
      <NeonDot x="3.5%" y="48%" size={3} color={RED}  delay={1.8} dur={5}   side="left" />
      <NeonDot x="1%"   y="75%" size={4} color={CYAN} delay={3.2} dur={4.5} side="left" />

      <HoloRing x="0.5%" y="12%" size={46} color={CYAN} dur={22} side="left" />

      {/* Scooter — bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ position: 'absolute', left: 10, bottom: 40, pointerEvents: 'none' }}
      >
        <ElectricScooterIcon sx={{ fontSize: { xs: 30, md: 48, lg: 60 }, color: CYAN }} />
      </motion.div>

      {/* ── Right ── */}
      <NeonLine x="2%" height={80}  color={CYAN} delay={1}   side="right" />
      <NeonLine x="5%" height={50}  color={RED}  delay={3.4} side="right" />

      <SpeedStreak y="28%" width={34} delay={1}   side="right" />
      <SpeedStreak y="58%" width={28} delay={2.6} side="right" />
      <SpeedStreak y="82%" width={40} delay={4}   side="right" />

      <NeonDot x="2%"  y="32%" size={3} color={RED}  delay={0.6} dur={5}   side="right" />
      <NeonDot x="4%"  y="62%" size={4} color={CYAN} delay={2.2} dur={4.5} side="right" />
      <NeonDot x="1%"  y="16%" size={3} color={CYAN} delay={4}   dur={6}   side="right" />

      <HoloRing x="1%" y="55%" size={38} color={RED}  dur={19} side="right" />
      <HoloRing x="4%" y="30%" size={28} color={CYAN} dur={26} side="right" />

      <ScanLine pos="top"    color={CYAN}      delay={0} />
      <ScanLine pos="bottom" color={`${RED}88`} delay={1.2} />
    </>
  );
}
