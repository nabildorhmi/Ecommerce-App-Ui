import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SpeedIcon from '@mui/icons-material/Speed';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

const FEATURES = [
    {
        icon: <SpeedIcon sx={{ fontSize: '2rem' }} />,
        color: '#00C2FF',
        title: 'Haute Performance',
        subLabel: 'パフォーマンス',
        desc: 'Moteurs puissants jusqu\'à 1500W pour une accélération vive en ville comme en périphérie.',
    },
    {
        icon: <DesignServicesOutlinedIcon sx={{ fontSize: '2rem' }} />,
        color: '#F0B429',
        title: 'Design Premium',
        subLabel: 'デザイン',
        desc: 'Lignes épurées, finitions haut de gamme. Un style qui se démarque dans chaque rue.',
    },
    {
        icon: <BatteryChargingFullIcon sx={{ fontSize: '2rem' }} />,
        color: '#00C853',
        title: 'Grande Autonomie',
        subLabel: 'バッテリー',
        desc: 'Batteries longue durée offrant jusqu\'à 80 km d\'autonomie sur une seule charge.',
    },
    {
        icon: <BuildOutlinedIcon sx={{ fontSize: '2rem' }} />,
        color: '#FF6B35',
        title: 'SAV Expert',
        subLabel: 'サービス',
        desc: 'Équipe technique certifiée. Pièces détachées disponibles. Intervention rapide.',
    },
];

export function WhyChooseUsSection() {
    return (
        <Box
            component="section"
            sx={{
                bgcolor: 'background.default',
                py: { xs: 5, md: 8 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(0,194,255,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                },
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
                    {/* Left: text content */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography
                            sx={{
                                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.28em',
                                color: 'primary.main', textTransform: 'uppercase', mb: 1.5,
                            }}
                        >
                            技術革新 — NOS ATOUTS
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.2rem' },
                                color: 'text.primary', letterSpacing: '-0.02em', lineHeight: 1.15, mb: 2,
                            }}
                        >
                            CONÇUS POUR LA VILLE DE DEMAIN
                        </Typography>
                        <Typography sx={{ fontSize: '0.92rem', color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                            Chaque scooter électrique MiraiTech est soigneusement sélectionné pour allier performance, design et fiabilité. Nous ne vendons que ce que nous recommandons.
                        </Typography>
                        {/* Stats */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            {[
                                { value: '500+', label: 'Clients satisfaits' },
                                { value: '20+', label: 'Modèles disponibles' },
                                { value: '2 ans', label: 'Garantie offerte' },
                                { value: '48h', label: 'Livraison rapide' },
                            ].map(({ value, label }) => (
                                <Box key={label} sx={{ p: 1.75, borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(17,17,22,0.5)' }}>
                                    <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#00C2FF', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</Typography>
                                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.5, fontWeight: 500 }}>{label}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Right: feature cards */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            {FEATURES.map(({ icon, color, title, subLabel, desc }, i) => (
                                <Box
                                    key={title}
                                    sx={{
                                        p: { xs: 2.5, md: 3 },
                                        borderRadius: '18px',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        background: 'rgba(17, 17, 22, 0.6)',
                                        backdropFilter: 'blur(16px)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        animation: `card-enter 0.5s ease-out ${i * 0.12}s both`,
                                        '&:hover': {
                                            borderColor: `${color}30`,
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 12px 36px ${color}12`,
                                        },
                                    }}
                                >
                                    <Box sx={{ color, mb: 1.25, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {icon}
                                        <Typography sx={{ fontFamily: '"Noto Serif JP", serif', fontSize: '0.55rem', color: `${color}40`, letterSpacing: '0.1em' }}>
                                            {subLabel}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'text.primary', mb: 0.75 }}>{title}</Typography>
                                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.65 }}>{desc}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
