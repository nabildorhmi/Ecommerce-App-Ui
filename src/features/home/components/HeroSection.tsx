import { Link } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import heroScooter from '@/assets/hero-scooter.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';

const CYAN = '#00C2FF';

const stats = [
    { value: '50+', label: 'Modèles' },
    { value: '2 ans', label: 'Garantie' },
    { value: '4.8★', label: 'Avis clients' },
];

/**
 * Full-screen hero section — static split layout matching the reference design.
 * Left: headline + CTA + stats | Right: scooter on cyberpunk city background.
 */
export function HeroSection() {
    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: { xs: '85vh', md: '88vh' },
                bgcolor: '#0B0B0E',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* ── Full background scooter image (right side fade) ── */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, right: 0, bottom: 0,
                    width: { xs: '100%', md: '65%' },
                    zIndex: 0,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: {
                            xs: 'linear-gradient(to top, rgba(11,11,14,0.95) 0%, rgba(11,11,14,0.6) 60%, rgba(11,11,14,0.4) 100%)',
                            md: 'linear-gradient(to right, rgba(11,11,14,1) 0%, rgba(11,11,14,0.65) 30%, rgba(11,11,14,0.15) 70%, rgba(11,11,14,0.4) 100%)',
                        },
                        zIndex: 1,
                    },
                }}
            >
                <Box
                    component="img"
                    src={heroScooter}
                    alt="Scooter électrique MiraiTech"
                    sx={{
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                    }}
                />
            </Box>

            {/* ── Subtle scan-line texture ── */}
            <Box sx={{
                position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
            }} />

            {/* ── Ambient cyan glow from left ── */}
            <Box sx={{
                position: 'absolute', left: -200, top: '30%', width: 600, height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,194,255,0.06) 0%, transparent 65%)',
                zIndex: 1, pointerEvents: 'none',
            }} />

            {/* ── Content ── */}
            <Box
                sx={{
                    position: 'relative', zIndex: 2,
                    width: '100%', maxWidth: '1400px',
                    mx: 'auto', px: { xs: 2.5, sm: 4, md: 8, lg: 10 },
                    py: { xs: 8, md: 0 },
                }}
            >
                <Box sx={{ maxWidth: { xs: '100%', md: 520 } }}>
                    {/* NOUVELLE COLLECTION badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <Box sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1,
                            px: 1.75, py: 0.6,
                            bgcolor: 'rgba(0,194,255,0.08)',
                            border: '1px solid rgba(0,194,255,0.25)',
                            borderRadius: '20px',
                            mb: 3,
                        }}>
                            <ElectricScooterIcon sx={{ fontSize: '0.85rem', color: CYAN }} />
                            <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', color: CYAN, textTransform: 'uppercase' }}>
                                NOUVELLE COLLECTION 2026
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                fontFamily: '"Outfit", sans-serif',
                                fontWeight: 900,
                                fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem', lg: '4.6rem' },
                                lineHeight: 1.05,
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase',
                                color: '#F5F7FA',
                                mb: 2.5,
                            }}
                        >
                            L'AVENIR DE<br />
                            LA{' '}
                            <Box
                                component="span"
                                sx={{
                                    color: CYAN,
                                    textShadow: `0 0 30px rgba(0,194,255,0.4), 0 0 60px rgba(0,194,255,0.15)`,
                                }}
                            >
                                MOBILITÉ
                            </Box>
                            <br />URBAINE
                        </Typography>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '0.88rem', md: '0.95rem' },
                                color: 'rgba(255,255,255,0.55)',
                                lineHeight: 1.75,
                                mb: 4,
                                maxWidth: 400,
                            }}
                        >
                            Découvrez nos trottinettes électriques haute performance. Design futuriste, technologie de pointe — conçues pour conquérir la{' '}
                            <Box component="span" sx={{ color: CYAN }}>ville.</Box>
                        </Typography>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                    >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 5 }}>
                            <Button
                                component={Link}
                                to="/products"
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    px: 3.5, py: 1.5, fontSize: '0.88rem',
                                    background: `linear-gradient(135deg, ${CYAN}, #0099CC)`,
                                    color: '#0B0B0E', fontWeight: 800,
                                    boxShadow: `0 8px 28px rgba(0,194,255,0.4), inset 0 1px 0 rgba(255,255,255,0.4)`,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, #33CFFF, ${CYAN})`,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 14px 36px rgba(0,194,255,0.55)`,
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                DÉCOUVRIR
                            </Button>
                            <Button
                                component={Link}
                                to="/a-propos"
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 3.5, py: 1.5, fontSize: '0.88rem',
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    color: 'rgba(255,255,255,0.75)',
                                    '&:hover': {
                                        borderColor: 'rgba(255,255,255,0.5)',
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                EN SAVOIR PLUS
                            </Button>
                        </Box>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        <Box sx={{ display: 'flex', gap: { xs: 3, md: 4 }, flexWrap: 'wrap' }}>
                            {stats.map(({ value, label }) => (
                                <Box key={label}>
                                    <Typography
                                        sx={{
                                            fontWeight: 900, fontSize: { xs: '1.4rem', md: '1.75rem' },
                                            color: CYAN, lineHeight: 1,
                                            textShadow: `0 0 20px rgba(0,194,255,0.35)`,
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        {value}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500, mt: 0.25 }}>
                                        {label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
}
