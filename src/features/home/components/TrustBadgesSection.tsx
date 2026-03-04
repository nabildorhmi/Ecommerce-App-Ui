import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { AnimatedSection } from '@/shared/components/AnimatedSection';
import { fadeInUp } from '@/shared/animations/variants';

const TRUST_ITEMS = [
    {
        icon: <LocalShippingOutlinedIcon sx={{ fontSize: '1.3rem' }} />,
        color: '#00C2FF',
        label: 'Livraison gratuite',
        desc: 'Commandes +2000 MAD',
    },
    {
        icon: <VerifiedUserOutlinedIcon sx={{ fontSize: '1.3rem' }} />,
        color: '#2EAD5F',
        label: 'Garantie 2 ans',
        desc: "Pièces & main-d'œuvre",
    },
    {
        icon: <SupportAgentOutlinedIcon sx={{ fontSize: '1.3rem' }} />,
        color: '#D4A43A',
        label: 'SAV réactif',
        desc: 'Réponse en 24h',
    },
    {
        icon: <StarOutlineIcon sx={{ fontSize: '1.3rem' }} />,
        color: '#D97A50',
        label: 'Avis 4.8/5',
        desc: '+500 clients satisfaits',
    },
];

export function TrustBadgesSection() {
    return (
        <AnimatedSection>
            <Box
                component="section"
                sx={{
                    bgcolor: '#0c0c14',
                    py: 4,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
                            gap: { xs: 2, sm: 3 },
                            p: 3,
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            bgcolor: 'rgba(19,19,27,0.6)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        {TRUST_ITEMS.map(({ icon, color, label, desc }, i) => (
                            <motion.div
                                key={label}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        p: { xs: 1, sm: 0 },
                                        borderRadius: '12px',
                                        transition: 'all 0.3s var(--mirai-ease)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <Box sx={{
                                        width: 40, height: 40,
                                        borderRadius: '50%',
                                        bgcolor: `${color}12`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color,
                                        flexShrink: 0,
                                    }}>
                                        {icon}
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.78rem', sm: '0.9rem' }, color: '#E8ECF2', fontFamily: '"Orbitron", sans-serif' }}>
                                            {label}
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.72rem', color: '#8A919D' }}>
                                            {desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </Container>
            </Box>
        </AnimatedSection>
    );
}
