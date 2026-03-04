import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const TRUST_ITEMS = [
    {
        icon: <LocalShippingOutlinedIcon sx={{ fontSize: '1.4rem' }} />,
        color: '#00C2FF',
        label: 'Livraison gratuite',
        desc: 'Commandes +2000 MAD',
    },
    {
        icon: <VerifiedUserOutlinedIcon sx={{ fontSize: '1.4rem' }} />,
        color: '#00C2FF',
        label: 'Garantie 2 ans',
        desc: "Pièces & main-d'œuvre",
    },
    {
        icon: <SupportAgentOutlinedIcon sx={{ fontSize: '1.4rem' }} />,
        color: '#00C2FF',
        label: 'SAV réactif',
        desc: 'Réponse en 24h',
    },
    {
        icon: <StarOutlineIcon sx={{ fontSize: '1.4rem' }} />,
        color: '#00C2FF',
        label: 'Avis 4.8/5',
        desc: '+500 clients satisfaits',
    },
];

export function TrustBadgesSection() {
    return (
        <Box
            component="section"
            sx={{
                bgcolor: '#0B0B0E',
                py: 4,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: 3,
                        p: 3,
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        bgcolor: 'rgba(17,17,22,0.6)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {TRUST_ITEMS.map(({ icon, color, label, desc }) => (
                        <Box
                            key={label}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                flex: '1 1 auto',
                                minWidth: 200,
                            }}
                        >
                            <Box sx={{ color, display: 'flex' }}>{icon}</Box>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#F5F7FA', fontFamily: '"Orbitron", sans-serif' }}>
                                    {label}
                                </Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                                    {desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
